import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { ShapeForm, ShapePreview } from "..";

const CreateShape = (props) => {
    const [shapeInformation, setShapeInformation] = useState({
        "name": "Tilted Square", 
        "type": "tiltedSquare",
        "formula": "polygon(10% 10%, 90% 10%, 90% 90%, 10% 80%)",
        "vertices": 4,
        "edges": 4, 
        "notes": "", 
        "clipPathType": "polygon",
        "showShadow": true, 
        "backgroundColor": "#12a8d6", 
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
    });

    const handleFormChange = (event) => {
        const name = event.target.name || event.type; 
        const value = event.target.value === "checkbox" ? event.target.checked : event.target.value; 

        console.log(event);

        if (name === "name") {
            setShapeInformation({
                ...shapeInformation, 
                "name": value, 
                "type": value.toLowerCase(),
            });
        } else if (name === "formula") {
            const edgeVerticeNumber = shapeInformation.clipPathType === "polygon" ? value.split(",").length : 0; 

            if (value === "") {
                handleFormulaChange(shapeInformation.clipPathType + "()", edgeVerticeNumber)
            } else if (value.includes("polygon")) {
                handleFormulaChange(value, edgeVerticeNumber, "polygon");
            } else if (value.includes("circle")) {
                handleFormulaChange(value, edgeVerticeNumber, "circle");
            } else if (value.includes("ellipse")) {
                handleFormulaChange(value, edgeVerticeNumber, "ellipse");
            } else {
                handleFormulaChange(value, edgeVerticeNumber);
            }
        } else if (name === "clipPathType") {
            handleClipPathChange(value);
        } else {
            setShapeInformation({
                ...shapeInformation,
                [name]: value,
            });
        }
    }
    
    function handlePreviewChange(event, data, number) {
        const name = event.target.name || event.type;

        console.log(event, data);

        if (name === "mousemove") {
            const newVerticeCoordinates = addNewVerticeCoordinates(data.x, data.y, number);
            const newFormula = generateNewFormula(newVerticeCoordinates);

            setShapeInformation({
            ...shapeInformation, 
            "verticeCoordinates": newVerticeCoordinates, 
            "formula": newFormula, 
            });
        } else if (name === "click" && event.target.id === "shapeShadow") {
            const newVerticeCoordinates = addNewVerticeCoordinates(event.nativeEvent.offsetX, event.nativeEvent.offsetY, shapeInformation.verticeCoordinates.length);
            const newFormula = generateNewFormula(newVerticeCoordinates);

            setShapeInformation({
            ...shapeInformation, 
            "vertices": shapeInformation.vertices + 1, 
            "edges": shapeInformation.edges + 1, 
            "verticeCoordinates": newVerticeCoordinates, 
            "formula": newFormula,
            });
        } else if ((event.target.id.includes("deleteButton") || event.target.localName === "line") && number !== undefined) {

            console.log("worked");

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

        }
    }

    function addNewVerticeCoordinates(x ,y, number) {
        const xPercentage = Math.round((x / 280.0) * 100.0);
        const yPercentage = Math.round((y / 280.0) * 100.0);

        let newVerticeCoordinates = shapeInformation.verticeCoordinates;
        newVerticeCoordinates[number] = {
            "x": xPercentage + "%",
            "y": yPercentage + "%"
        }

        return newVerticeCoordinates;
    }

    function generateNewFormula(newVerticeCoordinates) {
        let newFormula = shapeInformation.clipPathType + "(";

        for (let i = 0; i < newVerticeCoordinates.length; i++) {
            let newX = newVerticeCoordinates[i].x; 
            let newY = newVerticeCoordinates[i].y;

            i === newVerticeCoordinates.length - 1 ? newFormula = newFormula + newX + " " + newY + ")" : newFormula = newFormula + newX + " " + newY + ", ";
        }

        return newFormula;
    }

    function handleFormulaChange(formula, edgeVerticeNumber, clipPathType) {
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

        function handleClipPathChange(clipPathType) {
        if (clipPathType === "polygon") {
            setShapeInformation({
            ...shapeInformation, 
            "name": "Tilted Square", 
            "type": "tiltedSquare", 
            "formula": "polygon(10% 10%, 90% 10%, 90% 90%, 10% 80%)", 
            });
        }

        if (clipPathType === "circle") {
            setShapeInformation({
            ...shapeInformation, 
            "name": "Circle", 
            "type": "circle", 
            "formula": "circle(50% at 50% 50%)",
            });
        }

        if (clipPathType === "ellipse") {
            setShapeInformation({
            ...shapeInformation, 
            "name": "Ellipse", 
            "type": "ellipse", 
            "formula": "ellipse(25% 40% at 50% 50%)",
            });
        }

        setShapeInformation(prevState => {
            return {
            ...prevState, 
            "clipPathType": clipPathType, 
            "edges": clipPathType === "polygon" ? 4 : 0,
            "vertices": clipPathType === "polygon" ? 4 : 0, 
            "notes": "", 
            }
        })
    }

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    }

    return(
        <>
            <Modal
                show={props.show}
                centered
                size="xl"
                onHide={props.handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Shape</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row lg={2} md={1} sm={1} xs={1}>
                            <Col>
                                <ShapeForm 
                                    shapeInformation={shapeInformation} 
                                    handleChange={handleFormChange} 
                                    handleSubmit={handleSubmit} 
                                    validated={validated} 
                                />
                            </Col>
                            <Col>
                                <ShapePreview 
                                    shapeInformation={shapeInformation} 
                                    handleChange={handlePreviewChange} 
                                />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => props.handleClose()} variant="outline-info">
                        Close
                    </Button>
                    <Button variant="secondary" type="submit" form="createShapeForm">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateShape;