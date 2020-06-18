import React, { Component } from 'react';
import  axios from 'axios';

class Users extends Component {

    state = {
        isLoading: true,
        users: [],
        error: null
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        const baseURL = process.env.REACT_APP_API_URL;
        const loginAPIURL = baseURL + '/api/users';
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: 'Bearer ' + token }
        };
        axios.defaults.withCredentials = true;
        axios.get(loginAPIURL, config)
        .then(res => {
            console.log(res.data);
            res.data.map(user => ({
                name: '${user.email}',
                email: '${user.email}',
                role: '${user.role}',
            }))
        })
        .then(users => {
            this.setState({
                users,
                isLoading: false
            });
        });
    }

    renderTableData() {
        // return this.state.users.map((user, index) => {
        //     const { id, name, email, role } = user //destructuring
        //     return (
        //        <tr key={id}>
        //           <td>{name}</td>
        //           <td>{email}</td>
        //           <td>{role}</td>
        //        </tr>
        //     )
        // })
    }

    render() {
        const { isLoading, users } = this.state;
        return (
            <div className='container' style={{ marginTop: "50px" }}>
                {!isLoading ? (
                    users.map(user => {
                        const { id, name, email, role } = user;
                        return (
                            <div key={id}>
                                <p>Name: {name}</p>
                                <p>Email Address: {email}</p>
                                <p>Role: {role}</p>
                                <hr />
                            </div>
                        );
                    })
                ) : (
                    // If there is a delay in data, let's let the user know it's loading
                    <h3>Loading...</h3>
                )}
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
                                            { this.renderTableData() }
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