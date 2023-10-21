import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { ShapeForm, ShapePreview } from "..";
import toast from "react-hot-toast";
import {
  generateNewVerticeCoordinates,
  generateNewFormula,
  handleFormulaChange,
  calculateRadiusAndFormulaFromMovement,
  separateXYValueIntoObject,
} from "../../utils/shape-calculations.js";
import {
  initialState,
  polygonInitialState,
  circleInitialState,
  ellipseInitialState,
} from "../../utils/shape-initial-data.js";

const CreateShape = (props) => {
  const [shapes, setShapes] = useState([]);
  const [shapeInformation, setShapeInformation] = useState({ ...initialState });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreRef = useRef();

  useEffect(() => {
    if (props.edit) {
      loadShapeForEdit(props.shape);
    }
    loadShapes();
  }, []);

  const loadShapeForEdit = (shapeToEdit) => {
    setShapeInformation({
      name: shapeToEdit.name,
      formula: shapeToEdit.formula,
      vertices: shapeInformation.vertices, 
                visibility: shapeInformation.private, 
                edges: shapeInformation.edges, 
                notes: shapeInformation.notes, 
                type: shapeInformation.clipPathType, 
                backgroundColor: shapeInformation.backgroundColor,
                createdBy: props.user.email,
                likes: 0
    });
  };

  const loadShapes = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.get(`/api/shapes?page=${page}`);
      const newShapes = response.data.shapes;

      if (newShapes.length === 0) {
        setHasMore(false);
      } else {
        setShapes((prevShapes) => [...prevShapes, ...newShapes]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error("Error loading shapes: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event, data, number, type) => {
    const name = event.target.name || event.type;
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;

    if (name === "name") {
      setShapeInformation({
        ...shapeInformation,
        name: value,
      });
      return;
    }

    if (name === "formula") {
      const edgeVerticeNumber = shapeInformation.clipPathType === "polygon" && value !== "" ? value.split(",").length : 0;

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

    if (name === "clipPathType") {
      if (value === "polygon") {
        setShapeInformation({
          ...shapeInformation,
          ...polygonInitialState,
        });
      }

      if (value === "circle") {
        setShapeInformation({
          ...shapeInformation,
          ...circleInitialState,
        });
      }

      if (value === "ellipse") {
        setShapeInformation({
          ...shapeInformation,
          ...ellipseInitialState,
        });
      }

      setShapeInformation((prevState) => ({
        ...prevState,
        clipPathType: value,
        edges: value === "polygon" ? 4 : 0,
        vertices: value === "polygon" ? 4 : 0,
      }));
      return;
    }

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
          width: newFormulaValues.radius,
          formula: newFormula,
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
          height: newFormulaValues.radius,
          formula: newFormula,
        });
      } else {
        const newVerticeCoordinates = generateNewVerticeCoordinates(data.x, data.y, number, shapeInformation);
        const newFormula = generateNewFormula(newVerticeCoordinates, shapeInformation);

        setShapeInformation({
          ...shapeInformation,
          verticeCoordinates: newVerticeCoordinates,
          formula: newFormula,
        });
      }
      return;
    }

    if ((event.target.id === "shapeShadow" || event.target.id === "clippedShape") && name === "click" && shapeInformation.clipPathType === "polygon") {
      const newVerticeCoordinates = generateNewVerticeCoordinates(event.nativeEvent.offsetX, event.nativeEvent.offsetY, shapeInformation.verticeCoordinates.length, shapeInformation);
      const newFormula = generateNewFormula(newVerticeCoordinates, shapeInformation);

      setShapeInformation({
        ...shapeInformation,
        vertices: shapeInformation.vertices + 1,
        edges: shapeInformation.edges + 1,
        verticeCoordinates: newVerticeCoordinates,
        formula: newFormula,
      });
      return;
    }

    if ((event.target.id.includes("deleteButton") || event.target.parentElement.id.includes("deleteButton")) && number !== undefined) {
      let newVerticeCoordinates = [];

      for (let i = 0; i < shapeInformation.verticeCoordinates.length; i++) {
        if (i !== number) {
          newVerticeCoordinates.push(shapeInformation.verticeCoordinates[i]);
        }
      }

      const newFormula = generateNewFormula(newVerticeCoordinates, shapeInformation);

      setShapeInformation({
        ...shapeInformation,
        vertices: shapeInformation.vertices - 1,
        edges: shapeInformation.edges - 1,
        verticeCoordinates: newVerticeCoordinates,
        formula: newFormula,
      });
      return;
    }

    setShapeInformation({
      ...shapeInformation,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // The rest of the  handleSubmit logic comes here
  };

  return (
    <>
      <Modal
        show={props.show}
        centered
        size="lg"
        onHide={() => {
          setShapeInformation({ ...initialState });
          props.handleClose();
        }}
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
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            type="submit"
            form="createShapeForm"
            disabled={!shapeInformation.name}
          >
            {props.edit ? "Save Changes" : "Create"}
          </Button>
          <Button
            onClick={() => {
              setShapeInformation({ ...initialState });
              props.handleClose();
            }}
            variant="outline-dark"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateShape;
