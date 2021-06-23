import React, { useState } from "react";

// dynamic from Next.js
import dynamic from "next/dynamic";

// Bootstrap
import Modal from "react-bootstrap/Modal";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

// Styled Component
import styled from "styled-components";

// Clip-Path
const Shape = dynamic(import("react-clip-path"), { ssr: false });

const ShapeContainer = styled.section`
    border: solid 1px var(--color-neutral-30);
    padding: 1rem;
`;

// Toast
import toast from "react-hot-toast";

// icons
import { FiCopy } from 'react-icons/fi';

// misc utilities
import { getShapeId } from "../../utils/misc";

const CSSDisplay = styled.span`
  white-space: pre-line;
`;

const CopyIcon = styled(FiCopy)`
  cursor: pointer;
`;

const CopyShapeSource = ({ show, setShow, shape }) => {
    const [type, setType] = useState('css');
    const [selector, setSelector] = useState(shape.name);

    console.log(shape);

    const handleSelectorChange = evt => {
        const value = evt.target.value;
        if (!value) {
          setSelector(shape.name);
        } else {
          setSelector(value);
        }
    }

    const getCSSSelector = () => {
      
      return selector.toLowerCase().split(' ').join('-');
    }

    const getCSS = formula => {
      const css = `.${getCSSSelector()} { \n clip-path: ${formula}; \n background-color: #809000; \n width: 300px; \n height: 300px; \n }`;
      console.log(css);
      return css;
    }

    const copy = async (formula, css) => {
      let text = formula;
      if (css) {
        text = getCSS(formula);
      } 
      try {
        await navigator.clipboard.writeText(text);
        toast.success("Successfully Copied!");
        console.log("The CSS copied to clipboard");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }

    return(
        <>
        {true && (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          show={show}
          onHide={() => setShow(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Copy Source for {shape.name} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container fluid>
              <Row>
                <Col>
                  <Form>
                    <div>
                      <Form.Group>
                        <Form.Label>Export As</Form.Label>
                        <div>
                          <ToggleButtonGroup type="radio" name="options" defaultValue={1} variant="outline-dark" size="sm" defaultValue={type}>
                            <ToggleButton id="tbg-radio-1" value={'css'} variant="outline-dark" onClick={() => setType('css')}>
                                Show CSS
                            </ToggleButton>
                            <ToggleButton id="tbg-radio-2" value={'clip-path'} variant="outline-dark" onClick={() => setType('clip-path')}>
                                Show Clip-Path
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </div>
                      </Form.Group>
                    </div> 
                    { 
                        (type === 'css' && <Form.Group className="mb-3" id="export-name">
                        <Form.Label>CSS Selector Name</Form.Label>
                            <Form.Control type="text" name="name" value={selector} onChange={handleSelectorChange}/>
                        </Form.Group>)
                    }
                    {
                      (type && 
                        <div>
                            {type === 'css' && 
                            <>
                              <h3>CSS Snippet</h3>
                              <CSSDisplay>
                                <code>{getCSS(shape.formula)}</code>
                              </CSSDisplay>
                              <CopyIcon size={20} onClick={() => copy(shape.formula, true)}/>
                            </>
                            }
                            {type === 'clip-path' && 
                              <div>
                                <h3>Clip-Path Value</h3>
                                <code>{shape.formula}</code>
                                <CopyIcon size={20} onClick={() => copy(shape.formula, false)}/>
                              </div>
                            }
                        </div>
                      )
                    }
                  </Form>
                </Col>
                <Col>
                    <ShapeContainer>
                      <Shape
                        name={shape.name}
                        formula={shape.formula}
                        width="300px"
                        height="300px"
                        backgroundColor={shape.backgroundColor}
                        id={getShapeId(shape.name, true)}
                      />
                  </ShapeContainer>
                </Col>
              </Row>
            </Container>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="outline-info" onClick={() => setShow(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
        </>
    )

};

export default CopyShapeSource;