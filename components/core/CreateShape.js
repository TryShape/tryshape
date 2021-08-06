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

// shapecalculation functions
import { generateNewVerticeCoordinates, generateNewFormula, handleFormulaChange, calculateRadiusAndFormulaFromMovement } from "../../utils/shapecalculation.js";

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
                handleFormulaChange(`${shapeInformation.clipPathType}()`, edgeVerticeNumber, setShapeInformation);
            } else if (value.includes("polygon")) {
                handleFormulaChange(value, edgeVerticeNumber, setShapeInformation, "polygon");
            } else if (value.includes("circle")) {
                handleFormulaChange(value, edgeVerticeNumber, setShapeInformation, "circle");
            } else if (value.includes("ellipse")) {
                handleFormulaChange(value, edgeVerticeNumber, setShapeInformation, "ellipse");
            } else {
                handleFormulaChange(value, edgeVerticeNumber, setShapeInformation);
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
                const newFormulaValues = calculateRadiusAndFormulaFromMovement(
                    shapeInformation.verticeCoordinates[0].x, 
                    shapeInformation.width, 
                    shapeInformation.height, 
                    data.x
                );

                let newFormula; 

                if (shapeInformation.clipPathType === "circle") {
                    newFormula = `${shapeInformation.clipPathType}(${newFormulaValues.absoluteValueRadius} at ${shapeInformation.verticeCoordinates[0].x} ${shapeInformation.verticeCoordinates[0].y})`;
                } else if (shapeInformation.clipPathType === "ellipse") {
                    newFormula = `${shapeInformation.clipPathType}(${newFormulaValues.absoluteValueRadius} ${newFormulaValues.absoluteValueAxis} at ${shapeInformation.verticeCoordinates[0].x} ${shapeInformation.verticeCoordinates[0].y})`;
                }

                setShapeInformation({
                    ...shapeInformation, 
                    "width": newFormulaValues.radius, 
                    "formula": newFormula, 
                });

            } else if (type === "height") {
                const newFormulaValues = calculateRadiusAndFormulaFromMovement(
                    shapeInformation.verticeCoordinates[0].y, 
                    shapeInformation.height, 
                    shapeInformation.width, 
                    data.y
                );

                let newFormula; 

                if (shapeInformation.clipPathType === "ellipse") {
                    newFormula = `${shapeInformation.clipPathType}(${newFormulaValues.absoluteValueAxis} ${newFormulaValues.absoluteValueRadius} at ${shapeInformation.verticeCoordinates[0].x} ${shapeInformation.verticeCoordinates[0].y})`;
                }

                setShapeInformation({
                    ...shapeInformation, 
                    "height": newFormulaValues.radius, 
                    "formula": newFormula, 
                });

            } else {
                const newVerticeCoordinates = generateNewVerticeCoordinates(data.x, data.y, number, shapeInformation);
                const newFormula = generateNewFormula(newVerticeCoordinates, shapeInformation);

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

            const newVerticeCoordinates = generateNewVerticeCoordinates(event.nativeEvent.offsetX, event.nativeEvent.offsetY, shapeInformation.verticeCoordinates.length, shapeInformation);
            const newFormula = generateNewFormula(newVerticeCoordinates, shapeInformation);

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

            const newFormula = generateNewFormula(newVerticeCoordinates, shapeInformation);

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