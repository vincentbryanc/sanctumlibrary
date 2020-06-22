import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Login from './Login';
import Users from './Users';
import Error from './Error';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions'
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.logout();
    }

    render() {
        return (
            <Router>
                <Navbar bg="dark" variant="dark" expand="sm" >
                    <Navbar.Brand as={Link} to="/">ReactJS</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        {!this.props.isLoggedIn ? (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        ) : (
                            <>
                            <Nav.Link as={Link} to="/users">Users</Nav.Link>
                            <Nav.Link onClick={this.logout}>Logout</Nav.Link>
                            </>
                        )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                    <Switch>
                        <Route exact path="/" component={ Home } />
                        <Route path="/home" component={ Home } />
                        <Route path="/about" component={ About } />

                        <PublicRoute path="/login" component={ Login } />
                        <PrivateRoute  path="/users" component={ Users } />
                        <Route component={Error}/>
                    </Switch> 
            </Router>
        );
    }
}
 
// export default Navigation;

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps, { logout })(Navigation);