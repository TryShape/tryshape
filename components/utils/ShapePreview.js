import React from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";

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

const ShapePreview = (props) => {
    return(
        <>
            <Playground>
                <Box height="300px" width="300px">

                </Box>

                <Form style={{padding: '7px', textAlign: 'center'}}>
                    <Form.Check
                        type="switch"
                        name="showShadow"
                        id="modal-custom-switch"
                        label="Show Outside of the Clipped Area"
                    />
                </Form>
                Details Box
            </Playground>
        </>
    );
}

export default ShapePreview;