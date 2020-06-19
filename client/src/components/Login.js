import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import  axiosConfig from '../axiosConfig';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    login(e) {
        e.preventDefault();
        axiosConfig.post('/api/login', this.state).then(res => {
            if (res.data.errors) {
                alert('Username / Password field is required');
            }
            else if (res.data.message) {
                alert('Invalid Login Credentials');
            }
            else {
                const token = res.data.token;
                localStorage.setItem('token', token);
                console.log(localStorage.getItem('token'));
                this.props.history.push('/users')
            }
        });
    }

    render() {
        return (
            <Container>
                <div style={{ marginTop: "100px" }}>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Card>
                                <Card.Body>
                                    <Form>
                                        <h3 className='text-center'>Login to Continue</h3>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control name="email" type="email" placeholder="Email Address" onChange={this.onChange} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control name="password" type="password" placeholder="Password" onChange={this.onChange} />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" onClick={this.login}>Login</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }   
}
 
export default Login;