import React, { Component } from 'react';
import  axios from 'axios';

class Users extends Component {

    state = {
        users: [],
        isLoading: true,
        errors: null
    };

    fetchUsers() {
        const baseURL = process.env.REACT_APP_API_URL;
        const loginAPIURL = baseURL + '/api/users';
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: 'Bearer ' + token }
        };
        axios.defaults.withCredentials = true;
        axios.get(loginAPIURL, config)
        .then(response => {
            this.setState({
                users: response.data.data,
                isLoading: false
            });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
        this.fetchUsers();
    }

    render() {
        const { isLoading, users } = this.state;
        return (
            <div className='container' style={{ marginTop: "50px" }}>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-body'>
                                <h3 className='text-center' style={{ marginBottom: "20px" }}>Users</h3>
                                <div className='table-responsive'>
                                    <table className='table table-hover'>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!isLoading ? (
                                                users.map(users => {
                                                    const { id, name, email, role } = users;
                                                    return (
                                                        <tr key={id}>
                                                            <td>{name}</td>
                                                            <td>{email}</td>
                                                            <td>{role}</td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr><td colSpan='3' className='text-center'>Loading...</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }   
}
 
export default Users;