import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
 
const login = () => {
    return (
        <Container>
            <div style={{ marginTop: "100px" }}>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card>
                            <Card.Body>
                                <Form>
                                    <h3 class='text-center'>Login to Continue</h3>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email" placeholder="Email Address" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Login</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}
 
export default login;