import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = ({isLoggedIn, component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLoggedIn ?
                <Redirect to="/users" />  
            : <Component {...props} />
        )} />
    );
};

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(PublicRoute);