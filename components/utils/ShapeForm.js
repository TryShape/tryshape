import React from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";

const ColorPicker = styled.input`
    border-color: lightgray;
    border-radius: 3px;
    margin-left: 5px;
    padding: 2px 3px, 2px, 3px;
`;

const ShapeForm = (props) => {
    return (
        <Form id="previewForm">
            <Form.Group>
                <Form.Label>Shape Name:</Form.Label>
                <Form.Control 
                    type="text" 
                    name="name" 
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Description:</Form.Label>
                <Form.Control 
                    as="textarea" 
                    name="notes" 
                    rows={3}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Shape Color:</Form.Label>
                <ColorPicker 
                    type="color" 
                    name="backgroundColor"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Type of Clip Path:</Form.Label>
                <Form.Control 
                    as="select" 
                    name="clipPathType"
                >
                    <option value="polygon">Polygon</option>
                    <option value="circle">Circle</option>
                    <option value="ellipse">Ellipse</option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Clip-Path:</Form.Label>
                <Form.Control 
                    type="text" 
                    name="formula"
                />
            </Form.Group>
        </Form>
    );
}

export default ShapeForm;