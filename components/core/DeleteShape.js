import React from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import toast from "react-hot-toast";

import { harperFetch } from "../../utils/HarperFetch";

const DeleteShape = ({ show, setShow, shape, shapeAction, setShapeAction }) => {

    const handleDelete = async() => {
        const deleteShape = await harperFetch({
            operation: "sql", 
                sql: `
                    DELETE FROM tryshape.shapes
                    WHERE
                        shape_id === '${shape.shape_id}'
                `
        });

        console.log(deleteShape);

        if (deleteShape["deleted_hashes"].length > 0) {
            setShow(false);
            toast.success(`Shape ${shape.name} deleted successfully.`);
            setShapeAction({
                ...shapeAction, 
                "action": "delete",
                "payload": {
                    "shape_id": deleteShape["deleted_hashes"]
                } 
            });
        } else {
            toast.error('OOPS!! We hit a bummer. Please try again.');
        } 
    }

    return(
        <Modal
            size="md"
            show={ show }
            onHide={() => setShow(false)}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete Shape
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this shape? </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShow(false)}>
                    Cancel
                </Button>
                <Button onClick={() => handleDelete()}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteShape;