import React from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DeleteShape = ({ show, setShow, shape }) => {
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
                <Button>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteShape;