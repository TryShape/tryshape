// Returns an array that has a new verticeCoordinate
export const generateNewVerticeCoordinates = (x ,y, number, shapeInformation) => {

    let xValue;
    let yValue;

    // If there is a new coordinate
    if (shapeInformation.verticeCoordinates.length === number) {
        xValue = Math.round((x / 280.0) * 100.0) + "%";
        yValue = Math.round((y / 280.0) * 100.0) + "%";
    } else {

        // Determines whether previous x coordinate was in percentage or px and adjusts value to maintain same unit of measurement
        if (shapeInformation.verticeCoordinates[number].x.includes("%")) {
            xValue = Math.round((x / 280.0) * 100.0) + "%";
        } else if (shapeInformation.verticeCoordinates[number].x.includes("px")) {
            xValue = Math.round(x) + "px";
        }

        // Determines whether previous y coordinate was in percentage or px and adjusts value to maintain same unit of measurement
        if (shapeInformation.verticeCoordinates[number].y.includes("%")) {
            yValue = Math.round((y / 280.0) * 100.0) + "%";
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

        let absoluteValueWidth = Math.abs(shapeInformation.width.slice(0, shapeInformation.width.indexOf("%"))) + "%";

        newFormula = `${newFormula + absoluteValueWidth} at ${newX} ${newY})`;
    }

    if (shapeInformation.clipPathType === "ellipse") {
        let newX = newVerticeCoordinates[0].x; 
        let newY = newVerticeCoordinates[0].y;

        let absoluteValueWidth = Math.abs(shapeInformation.width.slice(0, shapeInformation.width.indexOf("%"))) + "%";
        let absoluteValueHeight = Math.abs(shapeInformation.height.slice(0, shapeInformation.height.indexOf("%"))) + "%";

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

const separateXYValueIntoObject = values => {

    let xValue;
    let yValue;

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

export const calculateHeightWidthValue = (coordinate, radius) => {
    let coordinateInteger;
    let radiusInteger;

    if (coordinate.includes("%")) {
        coordinateInteger = parseInt(coordinate.slice(0, coordinate.indexOf("%")));
    } else if (coordinate.includes("px")) {
        coordinateInteger = parseInt(coordinate.slice(0, coordinate.indexOf("px")));
        coordinateInteger = Math.round((coordinateInteger / 280.0) * 100.0);
    }

    if (radius.includes("%")) {
        radiusInteger = parseInt(radius.slice(0, radius.indexOf("%")));
    } else if (radius.includes("px")) {
        radiusInteger = parseInt(radius.slice(0, radius.indexOf("px")));
        radiusInteger = Math.round((radiusInteger / 280.0) * 100.0);
    }

    return (coordinateInteger + radiusInteger) + "%";
}