import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { fetchUsers } from '../../actions/userActions';

class Posts extends Component {

    componentDidMount() {
        // this.props.fetchUsers();
    }

    render() {

        // const userItems = this.props.users.map(user => (
        //     <tr key={user.id}>
        //         <td>{user.name}</td>
        //         <td>{user.email}</td>
        //         <td>{user.role}</td>
        //     </tr>
        // ));

        return (
            <div className='container' style={{ marginTop: "50px" }}>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-body'>
                                <h3 className='text-center' style={{ marginBottom: "20px" }}>Posts</h3>
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
                                            {/* {userItems} */}
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

export default connect(null)(Posts);