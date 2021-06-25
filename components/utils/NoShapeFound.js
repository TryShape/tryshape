import React, { useState } from 'react';

// Bootstrap
import Button from "react-bootstrap/Button";
import ImgFeelingSad from '../../public/sorry-feeling.svg';

// Styled Component
import styled from "styled-components";

// icons
import { FiPlus } from 'react-icons/fi';

// CreateShape modal
import { CreateShape } from "..";

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    align-items: center;
    width: 40%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    .title {
        margin-top: 1rem;
        font-size: var(--fs-lg);
        font-weight: var(--fw-bold);
    }

    .desc {
        margin: 1rem 0 2rem 0;
    }

    img {
        max-width: 300px;
    }

`;

const NoShapeFound = (props) => {

    // Controls when CreateShape Modal Shows
    const [showCreateShape, setShowCreateShape] = useState(false);

    const closeModal = () => {
        setShowCreateShape(false);
    }

    return(
        <>
            <PageWrapper>
                <img src={ImgFeelingSad} width="360"/>
                <h2 className="title">Whooops!</h2>
                <p className="desc">We couldn't find the shape you are looking for. Why don't you start creating a shape of your own choice? or try to refine your search. </p>
                <Button variant='secondary' onClick={() => setShowCreateShape(true)}>
                    <FiPlus />
                    Create Shape
                </Button>
            </PageWrapper>
            <CreateShape
                show={showCreateShape} 
                handleClose={closeModal} 
                edit={false}
                user={props.user}
                shapeAction={props.shapeAction} 
                setShapeAction={props.setShapeAction}
            />
        </>
    )
};

export default NoShapeFound;