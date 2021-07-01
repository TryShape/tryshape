import React, { useRef } from "react";

// react-draggable npm
import Draggable from "react-draggable";

// icon
import { FiDelete } from "react-icons/fi";

// Styled Component
import styled from "styled-components";

// Bootstrap
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

const CircleVertice = styled.div`
  width: 20px;
  height: 20px;
  margin: 0px;
  padding: 0px;
  clip-path: circle(50% at 50% 50%);
  background-color: black;
  position: absolute;
`;

const DraggableVertice = (props) => {

    let x;
    let y;

    // Calculates x coordinates based on percentage or pixels
    if (props.x.includes("%")) {
        x = parseFloat(props.x) * 280.0 / 100.0;
    } else if (props.x.includes("px")) {
        x = parseFloat(props.x);
    }

    // Calulates y coordinates based on percentage or pixels
    if (props.y.includes("%")) {
        y = parseFloat(props.y) * 280.0 / 100.0; 
    } else if (props.y.includes("px")) {
        y = parseFloat(props.y);
    }

    // Handles when to show the close button
    const show = props.focusNumber === props.number;
    const target = useRef(null);

    const handleDrag = (e, data) => {
        props.handleChange(e, data, props.number);
    }

    const handleDelete = (e) => {
        props.handleChange(e, null, props.number);
        props.setFocusNumber(-1);
    }

    return(
        <>
            <Draggable 
                bounds="parent" 
                handle=".handle" 
                position={{x: x, y: y}} 
                grid={[2.8, 2.8]} 
                onDrag={(e, data) => {handleDrag(e, data); props.setFocusNumber(-1)}}
            >
                    <CircleVertice 
                        className="handle" 
                        onClick={() => {
                            if (show === false) {
                                props.setFocusNumber(props.number);
                            } else {
                                props.setFocusNumber(-1);
                            }
                        }}
                        onTouchStart={() => {
                            if (show === false) {
                                props.setFocusNumber(props.number);
                            } else {
                                props.setFocusNumber(-1);
                            }
                        }}
                        ref={target}
                    />
            </Draggable>

            <Overlay target={target.current} 
                show={show} 
                placement={x > 250 ? "left" : "right"}>
                <Tooltip>
                <FiDelete
                    size="24px"
                    id={"deleteButton" + props.number}
                    onMouseUp={handleDelete}
                    style={{ cursor: "pointer" }}
                    />
                </Tooltip>
            </Overlay>
        </>
    );
    
}

export default DraggableVertice;