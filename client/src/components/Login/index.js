import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../../actions/authActions';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: {
                email: '',
                password: '',
            }
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const auth = {
            email: this.state.email,
            password: this.state.password,
        };

        if (this.state.email === '') {
            alert('Email field is required');
        }
        else if (this.state.password === '') {
            alert('Password field is required');
        }
        else {
            this.props.authenticate(auth);
        }
    }

    render() {
        return (
            <div className='container'>
                <div style={{ marginTop: "100px" }}>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3'>
                            <div className='card'>
                                <div className='card-body'>
                                    <form onSubmit={this.onSubmit}>
                                        <h3 className='text-center'>Login to Continue</h3>
                                        <div className='form-group'>
                                            <label>Email Address</label>
                                            <input type='text' name="email" className='form-control' placeholder="Email Address" value={this.state.email} onChange={this.onChange} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Password</label>
                                            <input type='password' name="password" className='form-control' placeholder="Passowrd" value={this.state.password} onChange={this.onChange} />
                                        </div>
                                        <div className='form-group'>
                                            <input type='submit' className='btn btn-primary btn-block' value='Login' />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }   
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps, { authenticate })(Login);