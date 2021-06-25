import React, { useState, useEffect } from "react";

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

// harperDb fetch call
import { harperFetch } from "../../utils/HarperFetch";

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
        ]
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
                "private": true,
                "edges": props.shape.edges, 
                "notes": props.shape.notes, 
                "clipPathType": props.shape.type,
                "backgroundColor": props.shape.backgroundColor, 
                "verticeCoordinates" : newVerticeCoordinates, 
            });
        }

    }, [props.show]);

    // Changes shapeInformation when something in ShapeForm or ShapePreview is altered
    const handleChange = (event, data, number) => {
        
        // console.log(event, data);
        
        const name = event.target.name || event.type;
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;

        // If Clip-Path formula value is changed, it makes sure that the parentheses stay there and also alters the verticeCoordinates value
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
                ...initialState, 
                });
            }

            if (value === "circle") {
                setShapeInformation({
                ...shapeInformation, 
                "type": "circle", 
                "formula": "circle(50% at 50% 50%)",
                });
            }

            if (value === "ellipse") {
                setShapeInformation({
                ...shapeInformation, 
                "type": "ellipse", 
                "formula": "ellipse(25% 40% at 50% 50%)",
                });
            }

            setShapeInformation(prevState => {
                return {
                ...prevState, 
                "clipPathType": value, 
                "edges": value === "polygon" ? 4 : 0,
                "vertices": value === "polygon" ? 4 : 0, 
                "notes": "", 
                }
            });
            return;
        }
        
        // If DraggableVertice is moved, adjust verticeCoordinates and formula
        if (name === "mousemove") {
            
            const newVerticeCoordinates = addNewVerticeCoordinates(data.x, data.y, number);
            const newFormula = generateNewFormula(newVerticeCoordinates);

            setShapeInformation({
                ...shapeInformation, 
                "verticeCoordinates": newVerticeCoordinates, 
                "formula": newFormula, 
            });
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
        if (event.target.id.includes("deleteButton") && number !== undefined) {

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

        if (clipPathType === "polygon") {
            let formulaNumbers = formula.slice(formula.indexOf("(") + 1, formula.indexOf(")"));
            formulaNumbers = formulaNumbers.split(", "); 
            newVerticeCoordinates = formulaNumbers.map(x => {
            let percentageArray = x.split(" ");
            return {
                "x": percentageArray[0], 
                "y": percentageArray[1],
            }
            });
        }

        setShapeInformation(prevState => {
            return {
            ...prevState, 
            "formula": formula.includes("(") && formula.includes(")") ? formula : prevState.formula, 
            "clipPathType": clipPathType === null ? prevState.clipPathType : clipPathType,
            "vertices": edgeVerticeNumber, 
            "edges": edgeVerticeNumber, 
            "verticeCoordinates": newVerticeCoordinates, 
            }
        });
    }

    // Returns an array that has a new verticeCoordinate
    const addNewVerticeCoordinates = (x ,y, number) => {
        const xPercentage = Math.round((x / 280.0) * 100.0);
        const yPercentage = Math.round((y / 280.0) * 100.0);

        let newVerticeCoordinates = shapeInformation.verticeCoordinates;
        newVerticeCoordinates[number] = {
            "x": xPercentage + "%",
            "y": yPercentage + "%"
        }

        return newVerticeCoordinates;
    }

    // Returns a generated formula string from a verticeCoordinate array
    const generateNewFormula = (newVerticeCoordinates) => {

        let newFormula = shapeInformation.clipPathType + "(";

        if (newVerticeCoordinates.length === 0) {
            return newFormula + ")";
        }

        for (let i = 0; i < newVerticeCoordinates.length; i++) {
            let newX = newVerticeCoordinates[i].x; 
            let newY = newVerticeCoordinates[i].y;

            i === newVerticeCoordinates.length - 1 ? newFormula = newFormula + newX + " " + newY + ")" : newFormula = newFormula + newX + " " + newY + ", ";
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

            const editShape = await harperFetch({
                operation: "sql", 
                sql: `
                    UPDATE tryshape.shapes
                    SET
                        name = '${shapeInformation.name}', 
                        formula = '${shapeInformation.formula}', 
                        vertices = '${shapeInformation.vertices}', 
                        private = '${shapeInformation.private}', 
                        edges = '${shapeInformation.edges}', 
                        notes = '${shapeInformation.notes}', 
                        type = '${shapeInformation.clipPathType}', 
                        backgroundColor = '${shapeInformation.backgroundColor}'
                    WHERE
                        shape_id === '${props.shape.shape_id}'
                `
            });

            console.log(editShape);

            if (editShape["update_hashes"].length > 0) {
                props.handleClose();
                toast.success(`Shape ${shapeInformation.name} edited successfully.`);
                props.setShapeAction({
                    ...props.shapeAction, 
                    "action": "edit",
                    "payload": {
                        "shape_id": editShape['update_hashes']
                    } 
                });
            } else {
                toast.error('OOPS!! We hit a bummer. Please try again.');
            } 

        } else { // Creating Shape

            // Create the shape in the DB
            const insertShape = await harperFetch({
                operation: "sql",
                sql: `INSERT into tryshape.shapes(backgroundColor, createdAt, createdBy, edges, email, formula, likes, name, notes, private, type, vertices) 
                values('${shapeInformation.backgroundColor}', null, '${props.user.email}', ${shapeInformation.edges}, null, '${shapeInformation.formula}', 0, '${shapeInformation.name}', '${shapeInformation.notes}', ${shapeInformation.private}, '${shapeInformation.clipPathType}', ${shapeInformation.vertices})`,
            });

            console.log(insertShape);

            // Create the user in the db
            if (insertShape['inserted_hashes'].length > 0) {
                // First check if the user exist
                const result = await harperFetch({
                    operation: "sql",
                    sql: `SELECT count(*) from tryshape.users WHERE email='${props.user.email}'`,
                });
                const count = (result[0]['COUNT(*)']);
                console.log({count});
                // If doesn't exist, create in db
                if (count === 0) {
                    const insertUser = await harperFetch({
                        operation: "sql",
                        sql: `INSERT into tryshape.users(email, name, photoURL) 
                            values('${props.user.email}', '${props.user.displayName}', '${props.user.photoURL}')`,
                    });
                } else {
                    console.log(`The user ${props.user.email} present in DB`);
                }

                // Finally, close the modal and update the shape in UI
                props.handleClose();
                toast.success(`Shape ${shapeInformation.name} created successfully.`);
                props.setShapeAction({
                    ...props.shapeAction, 
                    "action": "add",
                    "payload": {
                        "shape_id": insertShape['inserted_hashes']
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
                    <Button onClick={() => { setShapeInformation({ ...initialState }); props.handleClose(); }} variant="outline-info">
                        Close
                    </Button>
                    <Button variant="secondary" type="submit" form="createShapeForm" disabled={!shapeInformation.name}>
                        {props.edit ? "Save Changes" : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateShape;