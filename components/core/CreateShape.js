import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Header, ShapeForm, ShapePreview } from "..";

const CreateShape = (props) => {
    return(
        <>
            <Header {...props} />
            <Container fluid>
                <Row lg={2} md={1} sm={1} xs={1}>
                    <Col>
                        <ShapePreview />
                    </Col>
                    <Col>
                        <ShapeForm />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default CreateShape;