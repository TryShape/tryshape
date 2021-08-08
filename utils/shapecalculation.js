// Returns an array that has a new verticeCoordinate
export const generateNewVerticeCoordinates = (x ,y, number, shapeInformation) => {

    let xValue;
    let yValue;

    // If there is a new coordinate
    if (shapeInformation.verticeCoordinates.length === number) {
        xValue = pixelToPercentage(x).percentage;
        yValue = pixelToPercentage(y).percentage;
    } else {

        // Determines whether previous x coordinate was in percentage or px and adjusts value to maintain same unit of measurement
        if (shapeInformation.verticeCoordinates[number].x.includes("%")) {
            xValue = pixelToPercentage(x).percentage;
        } else if (shapeInformation.verticeCoordinates[number].x.includes("px")) {
            xValue = Math.round(x) + "px";
        }

        // Determines whether previous y coordinate was in percentage or px and adjusts value to maintain same unit of measurement
        if (shapeInformation.verticeCoordinates[number].y.includes("%")) {
            yValue = pixelToPercentage(y).percentage;
        } else if (shapeInformation.verticeCoordinates[number].y.includes("px")) {
            yValue = Math.round(y) + "px";
        }
    }

    let newVerticeCoordinates = shapeInformation.verticeCoordinates;
    newVerticeCoordinates[number] = {
        "x": xValue,
        "y": yValue
    }

    return newVerticeCoordinates;
}

// Returns a generated formula string from a verticeCoordinate array
export const generateNewFormula = (newVerticeCoordinates, shapeInformation) => {

    let newFormula = shapeInformation.clipPathType + "(";

    if (newVerticeCoordinates.length === 0) {
        return newFormula + ")";
    }

    if (shapeInformation.clipPathType === "polygon") {
        for (let i = 0; i < newVerticeCoordinates.length; i++) {
            let newX = newVerticeCoordinates[i].x; 
            let newY = newVerticeCoordinates[i].y;

            i === newVerticeCoordinates.length - 1 ? 
                newFormula = `${newFormula + newX} ${newY})` : 
                newFormula = `${newFormula + newX} ${newY}, `;
        }
    }

    if (shapeInformation.clipPathType === "circle") {
        let newX = newVerticeCoordinates[0].x; 
        let newY = newVerticeCoordinates[0].y;

        let absoluteValueWidth;

        if (shapeInformation.width.includes("%")) {
            absoluteValueWidth = Math.abs(shapeInformation.width.slice(0, shapeInformation.width.indexOf("%"))) + "%";
        }

        if (shapeInformation.width.includes("px")) {
            absoluteValueWidth = Math.abs(shapeInformation.width.slice(0, shapeInformation.width.indexOf("px"))) + "px";
        }

        newFormula = `${newFormula + absoluteValueWidth} at ${newX} ${newY})`;
    }

    if (shapeInformation.clipPathType === "ellipse") {
        let newX = newVerticeCoordinates[0].x; 
        let newY = newVerticeCoordinates[0].y;

        let absoluteValueWidth;

        if (shapeInformation.width.includes("%")) {
            absoluteValueWidth = Math.abs(shapeInformation.width.slice(0, shapeInformation.width.indexOf("%"))) + "%";
        }

        if (shapeInformation.width.includes("px")) {
            absoluteValueWidth = Math.abs(shapeInformation.width.slice(0, shapeInformation.width.indexOf("px"))) + "px";
        }

        newFormula = `${newFormula + absoluteValueWidth} ${absoluteValueHeight} at ${newX} ${newY})`;
    }

    return newFormula;
}

// Called when there is a change in the textbox for formula in the form
// Adjusts verticeCoordinates, vertices, and edges accordingly
// Ensures that the parentheses remain
export const handleFormulaChange = (formula, edgeVerticeNumber, setShapeInformation, clipPathType) => {
    let newVerticeCoordinates = [];
    let newWidth; 
    let newHeight; 

    if (clipPathType === "polygon") {
        let formulaNumbers = formula.slice(formula.indexOf("(") + 1, formula.indexOf(")"));
        formulaNumbers = formulaNumbers.split(","); 
        newVerticeCoordinates = formulaNumbers.map(x => {
            let values = x.trim();

            return separateXYValueIntoObject(values);

        });
    }

    if (clipPathType === "circle" || clipPathType === "ellipse") {

        let values = formula.slice(formula.indexOf("at") + 3, formula.indexOf(")")).trim(); 

        newVerticeCoordinates = [separateXYValueIntoObject(values)];

    }

    if (clipPathType === "circle") {
        newWidth = formula.slice(formula.indexOf("(") + 1, formula.indexOf("at")).trim(); 
    }

    if (clipPathType === "ellipse") {

        let values = formula.slice(formula.indexOf("(") + 1, formula.indexOf("at")).trim();
        let formulaValues = separateXYValueIntoObject(values);

        newWidth = formulaValues.x;
        newHeight = formulaValues.y;
    }

    setShapeInformation(prevState => {
        return {
            ...prevState, 
            "formula": formula.includes("(") && formula.includes(")") ? formula : prevState.formula, 
            "clipPathType": clipPathType === undefined ? prevState.clipPathType : clipPathType,
            "vertices": edgeVerticeNumber, 
            "edges": edgeVerticeNumber, 
            "verticeCoordinates": newVerticeCoordinates, 
            "width" : newWidth !== undefined ? newWidth : prevState.width, 
            "height" : newHeight !== undefined ? newHeight : prevState.height, 
        }
    });
}

// Takes Two Coordinate Values and Separates Them to X and Y in an Object
export const separateXYValueIntoObject = values => {

    let xValue = "0%";
    let yValue = "0%";

    if (values.includes("%") && values.includes("px")) {

        let indexOfPX = values.indexOf("px");
        let indexOfPercentage = values.indexOf("%");

        if (indexOfPX < indexOfPercentage) {
            xValue = values.substring(0, values.indexOf("px") + 2).trim();
            yValue = values.substring(values.indexOf("px") + 2).trim();
        }

        if (indexOfPercentage < indexOfPX) {
            xValue = values.substring(0, values.indexOf("%") + 1).trim();
            yValue = values.substring(values.indexOf("%") + 1).trim();
        }

    } else if (values.includes("%")) {
        xValue = values.substring(0, values.indexOf("%") + 1).trim();
        yValue = values.substring(values.indexOf("%") + 1).trim();
    } else if (values.includes("px")) {
        xValue = values.substring(0, values.indexOf("px") + 2).trim();
        yValue = values.substring(values.indexOf("px") + 2).trim();
    }

    if (!(xValue.includes("px") || xValue.includes("%")) || xValue.includes(" ")) {
        xValue = "0%";
    }

    if (!(yValue.includes("px") || yValue.includes("%")) || yValue === "") {
        yValue = "0%";
    }

    return {
        "x": xValue, 
        "y": yValue, 
    };
}

// Takes the Center Coordinate of Ellipse or Circle and Calculates Distance From Height/Width Vertice From Center
export const calculateHeightWidthValue = (coordinate, radius) => {
    let coordinateInteger;
    let radiusInteger;

    if (coordinate.includes("%")) {
        coordinateInteger = parseInt(coordinate.slice(0, coordinate.indexOf("%")));
    } else if (coordinate.includes("px")) {
        coordinateInteger = parseInt(coordinate.slice(0, coordinate.indexOf("px")));
        coordinateInteger = pixelToPercentage(coordinateInteger).value;
    }

    if (radius.includes("%")) {
        radiusInteger = parseInt(radius.slice(0, radius.indexOf("%")));
    } else if (radius.includes("px")) {
        radiusInteger = parseInt(radius.slice(0, radius.indexOf("px")));
        radiusInteger = pixelToPercentage(radiusInteger).value;
    }

    return (coordinateInteger + radiusInteger) + "%";
}

// Calculates New Formula Values When Height or Width Vertices are Moved
export const calculateRadiusAndFormulaFromMovement = (centerCoordinate, axisValue, otherAxisValue, movementData) => {

    let center = centerCoordinate;

    let centerPercentageValue;
    let centerPixelValue;
    let radiusHolder;
    let radius;
    let absoluteValueRadius;
    let absoluteValueAxis;

    // Calculates Value of Axis Not Being Moved
    if (otherAxisValue.includes("%")) {
        absoluteValueAxis = Math.abs(otherAxisValue.slice(0, otherAxisValue.indexOf("%"))) + "%";
    } else if (otherAxisValue.includes("px")) {
        absoluteValueAxis = Math.abs(otherAxisValue.slice(0, otherAxisValue.indexOf("px"))) + "px";
    }

    // Calculates Value Of Center
    if (center.includes("%")) {
        center = parseInt(center.slice(0, center.indexOf("%")));
        centerPercentageValue = center;
        centerPixelValue = percentageToPixel(center).value;
    } else if (center.includes("px")) {
        center = parseInt(center.slice(0, center.indexOf("px")));
        centerPercentageValue = pixelToPercentage(center).value;
        centerPixelValue = center;
    }

    // Calculates Value of Axis Being Moved
    if (axisValue.includes("%")) {
        radiusHolder = pixelToPercentage(movementData).value;
        radius = (radiusHolder - centerPercentageValue) + "%";
        absoluteValueRadius = Math.abs(radiusHolder - centerPercentageValue) + "%";
    } else if (axisValue.includes("px")) {
        radiusHolder = Math.round(movementData);
        radius = (radiusHolder - centerPixelValue) + "px";
        absoluteValueRadius = Math.abs(radiusHolder - centerPixelValue) + "px";
    }

    return {
        "absoluteValueRadius": absoluteValueRadius,
        "absoluteValueAxis": absoluteValueAxis, 
        "radius": radius, 
    };
}

// Takes a Percentage Value and Turns It Into a Pixels Values
const percentageToPixel = (value) => {

    let holder = value.toString();

    if (holder.includes("%")) {
        holder = parseFloat(value.slice(0, value.indexOf("%")));
    }

    return {
        "value": Math.round((value / 100.0) * 280.0), 
        "percentage": Math.round((value / 100.0) * 280.0) + "px",
    }
}

// Takes a Pixel Value and Turns It Into a Percentage Value
const pixelToPercentage = (value) => {

    let holder = value.toString();

    if (holder.includes("px")) {
        holder = parseFloat(value.slice(0, value.indexOf("px")));
    }

    return {
        "value": Math.round((value / 280.0) * 100.0), 
        "percentage": Math.round((value / 280.0) * 100.0) + "%",
    }
}