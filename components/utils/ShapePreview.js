import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";

import { DraggableVertice } from "..";

const Playground = styled.div`
  width: 100%;
`;

const Box = styled.div`
    width: ${props => props.width || '100px'};
    height: ${props => props.height || '100px'};
    margin: 0 auto;
    position: relative;
`;

const Shadow = styled.div`
    background-color: ${props => props.backgroundColor || '#00c4ff'};
    opacity: 0.25;
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
`;

const Component = styled.div`
    clip-path: ${props => props.formula};
    background-color: ${props => props.backgroundColor || '#00c4ff'};
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
`;

const ShapeDetails = styled.ul`
  background-color: #ebebeb;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
`;

const ShapeDetailsItems = styled.li`
  word-wrap: break-word;
`;

const ShapePreview = (props) => {

    const [vertices, setVertices] = useState([]);
    const [focusNumber, setFocusNumber] = useState(-1);

    useEffect(() => {
        const array = []; 
    
        for (let i = 0; i < props.shapeInformation.vertices; i++) {
          array.push(
            <DraggableVertice 
                key={1000 + i}
                number = {i}
                x={props.shapeInformation.verticeCoordinates[i].x}
                y={props.shapeInformation.verticeCoordinates[i].y}
                handleChange={props.handleChange}
                focusNumber={focusNumber}
                setFocusNumber={setFocusNumber}
            />
          );
        }
        setVertices(array);
      }, [props.shapeInformation, focusNumber]);

    return(
        <>
            <Playground>
                <Box height="360px" width="360px" onClick={(e) => props.handleChange(e)}>
                    { props.shapeInformation.showShadow && <Shadow backgroundColor={props.shapeInformation.backgroundColor} id="shapeShadow" /> }
                    <Component formula={props.shapeInformation.formula} backgroundColor={props.shapeInformation.backgroundColor} id="clippedShape" />
                    {vertices}
                </Box>

                <Form style={{padding: '7px', textAlign: 'center'}}>
                    <Form.Check
                        type="switch"
                        name="showShadow"
                        id="modal-custom-switch"
                        label="Show Outside of the Clipped Area"
                        checked={props.shapeInformation.showShadow}
                        onChange={(e) => props.handleChange(e)}
                    />
                </Form>
            </Playground>
        </>
    );
}

export default ShapePreview;