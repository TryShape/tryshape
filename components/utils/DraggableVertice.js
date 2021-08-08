import React, { useRef, useState, useEffect } from "react";

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

    const [showVertice, setShowVertice] = useState(true);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    useEffect(() => {

        setShowVertice(true);
        let xValue;
        let yValue;

        // Calculates x coordinates based on percentage or pixels
        if (props.x.includes("%")) {

            setX(parseFloat(props.x) * 280.0 / 100.0);

            xValue = parseFloat(props.x.substring(0, props.x.indexOf("%") + 1));

            if (xValue > 100) {
                setShowVertice(false);
            }

        } else if (props.x.includes("px")) {
            setX(parseFloat(props.x));
            xValue = parseFloat(props.x.substring(0, props.x.indexOf("px") + 2));

            if (xValue > 280) {
                setShowVertice(false);
            }

        }

        // Calulates y coordinates based on percentage or pixels
        if (props.y.includes("%")) {

            setY(parseFloat(props.y) * 280.0 / 100.0);

            yValue = parseFloat(props.y.substring(0, props.y.indexOf("%") + 1));

            if (yValue > 100) {
                setShowVertice(false);
            }

        } else if (props.y.includes("px")) {
            setY(parseFloat(props.y));
            yValue = parseFloat(props.y.substring(0, props.y.indexOf("px") + 2));

            if (yValue > 280) {
                setShowVertice(false);
            }

        }

        if (xValue < 0 || yValue < 0) {
            setShowVertice(false);
        }

    }, [props]);

    // Handles when to show the close button
    const showClose = props.focusNumber === props.number;
    const target = useRef(null);

    const handleDrag = (e, data) => {
        props.handleChange(e, data, props.number, props.type);
    }

    const handleDelete = (e) => {
        props.handleChange(e, null, props.number, props.type);
        props.setFocusNumber(-1);
    }

    return(
        <>
            {showVertice ? 
                <>
                    <Draggable 
                        axis={props.type === "width" ? "x" : props.type === "height" ? "y" : "none"}
                        bounds="parent" 
                        handle=".handle" 
                        position={{x: x, y: y}} 
                        grid={[2.8, 2.8]} 
                        onDrag={(e, data) => {handleDrag(e, data); props.setFocusNumber(-1)}}
                    >
                            <CircleVertice 
                                className="handle" 
                                onClick={() => {
                                    if (showClose === false) {
                                        props.setFocusNumber(props.number);
                                    } else {
                                        props.setFocusNumber(-1);
                                    }
                                }}
                                onTouchStart={() => {
                                    if (showClose === false) {
                                        props.setFocusNumber(props.number);
                                    } else {
                                        props.setFocusNumber(-1);
                                    }
                                }}
                                ref={target}
                            />
                    </Draggable>

                    {props.clipPathType === "polygon" ?
                        <Overlay target={target.current} 
                            show={showClose} 
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
                        : null
                    }

                    
                </> : null
            }
        </>
    );
    
}

export default DraggableVertice;