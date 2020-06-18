import React from 'react';
 
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Login from './Login';
import Users from './Users';
import Error from './Error';
import { Nav, Navbar } from 'react-bootstrap';
 
const Navigation = () => {
    return (
        <BrowserRouter>
            <Navbar bg="dark" variant="dark" expand="sm" >
                <Navbar.Brand as={Link} to="/">ReactJS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/home">Home</Nav.Link>
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/home' component={Home}/>
                    <Route exact path='/about' component={About}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/users' component={Users}/>
                    <Route component={Error}/>
                </Switch> 
        </BrowserRouter>
    );
}
 
export default Navigation;