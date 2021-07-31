import React, { useState, useEffect } from "react";

// axios
import axios from "axios";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// ShapeForm and ShapePreview Components
import { ShapeForm, ShapePreview } from "..";

// Toast
import toast from "react-hot-toast";

const CreateShape = (props) => {

    // Store the default state as a variable so resetting form is easier
    const initialState = {
        "name": "", 
        "formula": "polygon(10% 10%, 90% 10%, 90% 90%, 10% 80%)",
        "vertices": 4,
        "private": false,
        "edges": 4, 
        "notes": "", 
        "clipPathType": "polygon",
        "showShadow": true, 
        "backgroundColor": "#d61284", 
        "verticeCoordinates" : [
            {
                "x": "10%", 
                "y": "10%", 
            }, 
            {
                "x": "90%", 
                "y": "10%", 
            }, 
            {
                "x": "90%", 
                "y": "90%", 
            }, 
            {
                "x": "10%", 
                "y": "80%", 
            }, 
        ], 
        "width" : "0%", 
        "height" : "0%", 
    }

    // shapeInformation holds all information about the shape
    const [shapeInformation, setShapeInformation] = useState({
        ...initialState, 
    });

    // Checks if edit is true and will provide different initial values
    useEffect(() => {

        if (props.edit) {
            let formula = props.shape.formula; 
            let slicedFormula = formula.slice(formula.indexOf("(") + 1, formula.indexOf(")"));
            let newVerticeCoordinates = slicedFormula.split(", ");
            newVerticeCoordinates = newVerticeCoordinates.map((value) => {
                let coordinates = value.split(" ");
                return {
                    "x": coordinates[0],
                    "y": coordinates[1],
                }
            });
    
            setShapeInformation({
                ...shapeInformation, 
                "name": props.shape.name, 
                "formula": props.shape.formula,
                "vertices": props.shape.vertices,
                "private": props.shape.private,
                "edges": props.shape.edges, 
                "notes": props.shape.notes, 
                "clipPathType": props.shape.type,
                "backgroundColor": props.shape.backgroundColor, 
                "verticeCoordinates" : newVerticeCoordinates, 
            });
        }

    }, [props.show]);

    // Changes shapeInformation when something in ShapeForm or ShapePreview is altered
    const handleChange = (event, data, number, type) => {
        
        const name = event.target.name || event.type;
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        
        // Handles name changes
        if (name === "name") {
            setShapeInformation({
                ...shapeInformation, 
                "name": value, 
            });
            return;
        }
        
        // If formula value is changed, alter formula value and verticeCoordinates value depending on clipPathType
        if (name === "formula") {

            const edgeVerticeNumber = shapeInformation.clipPathType === "polygon" && value !== "" ? value.split(",").length: 0;

            // If user deletes all, set formula to the Clip-Path type with an empty set of parentheses
            if (value === "") {
                handleFormulaChange(shapeInformation.clipPathType + "()", edgeVerticeNumber);
            } else if (value.includes("polygon")) {
                handleFormulaChange(value, edgeVerticeNumber, "polygon");
            } else if (value.includes("circle")) {
                handleFormulaChange(value, edgeVerticeNumber, "circle");
            } else if (value.includes("ellipse")) {
                handleFormulaChange(value, edgeVerticeNumber, "ellipse");
            } else {
                handleFormulaChange(value, edgeVerticeNumber);
            }
            return;

        }
        
        // If Clip-Path Type is changed, change the value of the clipPathType
        if (name === "clipPathType") {

            if (value === "polygon") {
                setShapeInformation({
                    ...shapeInformation, 
                    "formula": "polygon(10% 10%, 90% 10%, 90% 90%, 10% 80%)", 
                    "vertices": 4, 
                    "edges": 4,
                    "verticeCoordinates" : [
                        {
                            "x": "10%", 
                            "y": "10%", 
                        }, 
                        {
                            "x": "90%", 
                            "y": "10%", 
                        }, 
                        {
                            "x": "90%", 
                            "y": "90%", 
                        }, 
                        {
                            "x": "10%", 
                            "y": "80%", 
                        }, 
                    ], 
                    "width" : "0%", 
                    "height" : "0%", 
                });
            }

            if (value === "circle") {
                setShapeInformation({
                    ...shapeInformation, 
                    "type": "circle", 
                    "formula": "circle(50% at 50% 50%)",
                    "verticeCoordinates" : [
                        {
                            "x": "50%", 
                            "y": "50%", 
                        }
                    ], 
                    "width" : "50%", 
                    "height" : "50%", 
                });
            }

            if (value === "ellipse") {
                setShapeInformation({
                    ...shapeInformation, 
                    "type": "ellipse", 
                    "formula": "ellipse(25% 40% at 50% 50%)",
                    "verticeCoordinates" : [
                        {
                            "x": "50%", 
                            "y": "50%", 
                        }
                    ], 
                    "width" : "25%", 
                    "height" : "40%", 
                });
            }

            setShapeInformation(prevState => {
                return {
                    ...prevState, 
                    "clipPathType": value, 
                    "edges": value === "polygon" ? 4 : 0,
                    "vertices": value === "polygon" ? 4 : 0, 
                }
            });
            return;
        }
        
        // If DraggableVertice is moved, adjust verticeCoordinates and formula
        if (name === "mousemove" || name === "touchmove") {

            if (type === "width") {
                let center = shapeInformation.verticeCoordinates[0].x; 
                let width = Math.round((data.x / 280.0) * 100.0);

                center = parseInt(center.slice(0, center.indexOf("%")));

                let radius = (width - center) + "%"; 
                let absoluteValueRadius = Math.abs(width - center) + "%";

                let newFormula; 

                if (shapeInformation.clipPathType === "circle") {
                    newFormula = shapeInformation.clipPathType + "(" + absoluteValueRadius + " at " + shapeInformation.verticeCoordinates[0].x + " " + shapeInformation.verticeCoordinates[0].y + ")"; 
                } else if (shapeInformation.clipPathType === "ellipse") {
                    newFormula = shapeInformation.clipPathType + "(" + absoluteValueRadius + " " + shapeInformation.height + " at " + shapeInformation.verticeCoordinates[0].x + " " + shapeInformation.verticeCoordinates[0].y + ")";
                }

                setShapeInformation({
                    ...shapeInformation, 
                    "width": radius, 
                    "formula": newFormula, 
                }); 
            } else if (type === "height") {
                let center = shapeInformation.verticeCoordinates[0].y; 
                let height = Math.round((data.y / 280.0) * 100.0);

                center = parseInt(center.slice(0, center.indexOf("%")));

                let radius = (height - center) + "%"; 
                let absoluteValueRadius = Math.abs(height - center) + "%";

                let newFormula; 

                if (shapeInformation.clipPathType === "ellipse") {
                    newFormula = shapeInformation.clipPathType + "(" + shapeInformation.width + " " + absoluteValueRadius + " at " + shapeInformation.verticeCoordinates[0].x + " " + shapeInformation.verticeCoordinates[0].y + ")";
                }

                setShapeInformation({
                    ...shapeInformation, 
                    "height": radius, 
                    "formula": newFormula, 
                }); 
            } else {
                const newVerticeCoordinates = addNewVerticeCoordinates(data.x, data.y, number);
                const newFormula = generateNewFormula(newVerticeCoordinates);

                setShapeInformation({
                    ...shapeInformation, 
                    "verticeCoordinates": newVerticeCoordinates, 
                    "formula": newFormula, 
                });
            }

            return;
        }
        
        // If preview is clicked and the clipPathType is a polygon, add a verticeCoordinate value at its location and adjust formula
        if ((event.target.id === "shapeShadow" || event.target.id === "clippedShape") && name === "click" && shapeInformation.clipPathType === "polygon") {

            const newVerticeCoordinates = addNewVerticeCoordinates(event.nativeEvent.offsetX, event.nativeEvent.offsetY, shapeInformation.verticeCoordinates.length);
            const newFormula = generateNewFormula(newVerticeCoordinates);

            setShapeInformation({
                ...shapeInformation, 
                "vertices": shapeInformation.vertices + 1, 
                "edges": shapeInformation.edges + 1, 
                "verticeCoordinates": newVerticeCoordinates, 
                "formula": newFormula,
            });
            return;
        }

        // If delete button is pressed and passes a number that corresponds to the vertice, remove the corresponding verticeCoordinate and adjust formula
        if ((event.target.id.includes("deleteButton") 
            || event.target.parentElement.id.includes("deleteButton")) && number !== undefined) {

            let newVerticeCoordinates = []; 

            for (let i = 0; i < shapeInformation.verticeCoordinates.length; i++) {
                if (i !== number) {
                    newVerticeCoordinates.push(shapeInformation.verticeCoordinates[i]);
                }
            }

            const newFormula = generateNewFormula(newVerticeCoordinates);

            setShapeInformation({
                ...shapeInformation, 
                "vertices": shapeInformation.vertices - 1, 
                "edges": shapeInformation.edges - 1, 
                "verticeCoordinates": newVerticeCoordinates, 
                "formula": newFormula,
            }); 
            return;
        }
        
        // Handles all other ShapeForm and ShapePreview Changes
        setShapeInformation({
            ...shapeInformation, 
            [name]: value,
        });
    }

    // Called when there is a change in the textbox for formula in the form
    // Adjusts verticeCoordinates, vertices, and edges accordingly
    // Ensures that the parentheses remain
    const handleFormulaChange = (formula, edgeVerticeNumber, clipPathType) => {
        let newVerticeCoordinates = [];
        let newWidth; 
        let newHeight; 

        if (clipPathType === "polygon") {
            let formulaNumbers = formula.slice(formula.indexOf("(") + 1, formula.indexOf(")"));
            formulaNumbers = formulaNumbers.split(","); 
            newVerticeCoordinates = formulaNumbers.map(x => {
                let values = x.trim();
                let xValue = "";
                let yValue = "";

                // If the formula includes both percentage and px
                // Figure out which one comes first and use that index of find it
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
                }
            });
        }

        if (clipPathType === "circle" || "ellipse") {
            let coordinateValue = formula.slice(formula.indexOf("at") + 3, formula.indexOf(")")); 
            coordinateValue = coordinateValue.split(" ");

            newVerticeCoordinates = [
                {
                    "x": coordinateValue[0], 
                    "y": coordinateValue[1], 
                }
            ]

            newWidth = formula.slice(formula.indexOf("(") + 1, formula.indexOf(" at")); 

        }

        if (clipPathType === "ellipse") {
            let formulaValues = formula.split("%"); 

            newHeight = formulaValues[1].trim() + "%";
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

    // Returns an array that has a new verticeCoordinate
    const addNewVerticeCoordinates = (x ,y, number) => {

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
    const generateNewFormula = (newVerticeCoordinates) => {

        let newFormula = shapeInformation.clipPathType + "(";

        if (newVerticeCoordinates.length === 0) {
            return newFormula + ")";
        }

        if (shapeInformation.clipPathType === "polygon") {
            for (let i = 0; i < newVerticeCoordinates.length; i++) {
                let newX = newVerticeCoordinates[i].x; 
                let newY = newVerticeCoordinates[i].y;
    
                i === newVerticeCoordinates.length - 1 ? newFormula = newFormula + newX + " " + newY + ")" : newFormula = newFormula + newX + " " + newY + ", ";
            }
        }

        if (shapeInformation.clipPathType === "circle") {
            let newX = newVerticeCoordinates[0].x; 
            let newY = newVerticeCoordinates[0].y;

            newFormula = newFormula + shapeInformation.width + " at " + newX + " " + newY + ")";
        }

        if (shapeInformation.clipPathType === "ellipse") {
            let newX = newVerticeCoordinates[0].x; 
            let newY = newVerticeCoordinates[0].y;

            newFormula = newFormula + shapeInformation.width + " " + shapeInformation.height + " at " + newX + " " + newY + ")";
        }

        return newFormula;
    }

    // Form Validation
    const [validated, setValidated] = useState(false);

    const handleSubmit = async(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        console.log(shapeInformation);
        
        // Editing Shape
        if (props.edit) {

            const updateShapeResponse = await axios.post('/api/PUT/shape', {
                shapeId: props.shape.shape_id,
                name: shapeInformation.name, 
                formula: shapeInformation.formula, 
                vertices: shapeInformation.vertices, 
                visibility: shapeInformation.private, 
                edges: shapeInformation.edges, 
                notes: shapeInformation.notes, 
                type: shapeInformation.clipPathType, 
                backgroundColor: shapeInformation.backgroundColor
            });
            const editShape = updateShapeResponse.data;
            console.log({editShape});

            if (editShape.data["update_hashes"].length > 0) {
                props.handleClose();
                toast.success(`Shape ${shapeInformation.name} edited successfully.`);
                props.setShapeAction({
                    ...props.shapeAction, 
                    "action": "edit",
                    "payload": {
                        "shape_id": editShape.data['update_hashes']
                    } 
                });
            } else {
                toast.error('OOPS!! We hit a bummer. Please try again.');
            } 

        // Creating Shape
        } else { 

            // Create the shape in the DB
            const insertShapeResponse = await axios.post('/api/POST/shape', {
                name: shapeInformation.name, 
                formula: shapeInformation.formula, 
                vertices: shapeInformation.vertices, 
                visibility: shapeInformation.private, 
                edges: shapeInformation.edges, 
                notes: shapeInformation.notes, 
                type: shapeInformation.clipPathType, 
                backgroundColor: shapeInformation.backgroundColor,
                createdBy: props.user.email,
                likes: 0
            });
            const insertShape = insertShapeResponse.data

            console.log({insertShape});

            // Create the user in the db
            if (insertShape.data['inserted_hashes'].length > 0) {
                // First check if the user exist
                const userResponse = await axios.get("/api/GET/user", {
                    params: {
                      email: props.user.email
                    }
                  });
                const result = userResponse.data;
                const count = result.length;
                console.log({count});

                // If doesn't exist, create in db
                if (count === 0) {
                    const insertUserResponse = await axios.post('/api/POST/user', {
                        displayName: props.user.displayName, 
                        email: props.user.email, 
                        photoURL: props.user.photoURL
                    });
                    const insertUser = insertUserResponse.data;
                    console.log({insertUser});
                } else {
                    console.log(`The user ${props.user.email} present in DB`);
                }

                // Finally, close the modal and update the shape in UI
                props.handleClose();
                if (props.setSearchTerm) {
                    props.setSearchTerm('');
                }
                toast.success(`Shape ${shapeInformation.name} created successfully.`);
                props.setShapeAction({
                    ...props.shapeAction, 
                    "action": "add",
                    "payload": {
                        "shape_id": insertShape.data['inserted_hashes']
                    } 
                });

            } else {
                toast.error('OOPS!! We hit a bummer. Please try again.');
            }

        }

        setShapeInformation({
            ...initialState, 
        });

        setValidated(false);
        
    }

    return(
        <>
            <Modal
                show={props.show}
                centered
                size="lg"
                onHide={() => {setShapeInformation({ ...initialState }); props.handleClose(); }}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.edit ? "Edit Shape" : "Create Shape"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row lg={2} md={1} sm={1} xs={1}>
                            <Col>
                                <ShapePreview 
                                    shapeInformation={shapeInformation} 
                                    handleChange={handleChange} 
                                />
                            </Col>
                            <Col>
                                <ShapeForm 
                                    shapeInformation={shapeInformation} 
                                    handleChange={handleChange} 
                                    handleSubmit={handleSubmit} 
                                    validated={validated} 
                                />
                            </Col>
                            
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type="submit" form="createShapeForm" disabled={!shapeInformation.name}>
                        {props.edit ? "Save Changes" : "Create"}
                    </Button>
                    <Button onClick={() => { setShapeInformation({ ...initialState }); props.handleClose(); }} variant="outline-dark">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateShape;