import React from "react";

// Styled Component
import styled from "styled-components";

// Bootstrap
import Form from "react-bootstrap/Form";

const ColorPicker = styled.input`
    border-color: lightgray;
    border-radius: 3px;
    margin-left: 5px;
    padding: 2px 3px, 2px, 3px;
`;

const ShapeForm = (props) => {
    return (
        <Form noValidate validated={props.validated} onSubmit={props.handleSubmit} id="createShapeForm">
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    name="name" 
                    value={props.shapeInformation.name} 
                    onChange={props.handleChange} 
                    required
                />
                <Form.Control.Feedback type="invalid">Name required!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Control 
                    as="select" 
                    name="clipPathType" 
                    value={props.shapeInformation.clipPathType} 
                    onChange={props.handleChange}
                >
                    <option value="polygon">Polygon</option>
                    <option value="circle">Circle</option>
                    <option value="ellipse">Ellipse</option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Color</Form.Label>
                <ColorPicker 
                    type="color" 
                    name="backgroundColor"
                    value={props.shapeInformation.backgroundColor}
                    onChange={props.handleChange}
                    className="form-control-color"
                />
            </Form.Group>

            <Form.Group>
                <Form.Check
                    name="private"
                    label="Make it Private"
                    checked={props.shapeInformation.private}
                    onChange={(e) => props.handleChange(e)}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>What's it about?</Form.Label>
                <Form.Control 
                    as="textarea" 
                    name="notes" 
                    rows={3}
                    value={props.shapeInformation.notes} 
                    onChange={props.handleChange} 
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>CSS clip-Path</Form.Label>
                <Form.Control 
                    type="text" 
                    name="formula" 
                    value={props.shapeInformation.formula} 
                    onChange={props.handleChange} 
                    required
                />
                <Form.Control.Feedback type="invalid">Formula required!</Form.Control.Feedback>
            </Form.Group>
        </Form>
    );
}

export default ShapeForm;