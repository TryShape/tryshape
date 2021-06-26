import React from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import toast from "react-hot-toast";

import { harperFetch } from "../../utils/HarperFetch";

// Styled Component
import styled from "styled-components";

// icons
import { FiTrash2 } from 'react-icons/fi';


const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    grid-gap: 0.4rem;
`;

const ModalContent = styled.div`
    display: flex;
    align-items: flex-start;
    grid-gap: 1rem;
    padding: 1rem 0 0 0.6rem;
`;

const IconWrapper = styled.div`
    padding: 1.2rem 1rem 1rem 1rem;
    
    
`;

const ContentWrapper = styled.div`
    padding: 1rem 0;

    .modal-title {
        margin-left: 0;
    }
`;



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
            <Modal.Body>
                <ModalContent>
                    <IconWrapper>
                        <FiTrash2 size="48px" color='var(--color-primary-pink)' />
                    </IconWrapper>
                    <ContentWrapper>
                        <Modal.Title>Delete Shape</Modal.Title>
                        <p>Are you sure you want to delete this shape? </p>
                    </ContentWrapper>
                </ModalContent>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => handleDelete()} variant="danger">
                    Yes
                </Button>
                <Button onClick={() => setShow(false)} variant="outline-dark">
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteShape;