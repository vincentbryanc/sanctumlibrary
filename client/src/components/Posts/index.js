import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts, updatePost, deletePost } from '../../actions/postActions';
import NewPost from './NewPost';
import { Button, Modal } from 'react-bootstrap';
import Moment from 'react-moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2'

class Posts extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            content: '',
            selectedData: {},
            show: false
        }
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchPosts();
    }

    openEditModal(post) {
        this.setState({selectedData: post});
        this.setState({content: post.content});
        this.setState({show: true});
    }

    closeEditModal() {
        this.setState({show: false});
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    updatePost() {
        const post_id = this.state.selectedData.id;
        const post_current_content = this.state.content;
        const post_original_content = this.state.selectedData.content;
        if (post_original_content !== post_current_content) {
            this.props.updatePost(post_id, post_current_content);
            this.closeEditModal();
            this.success_alert('Updated!', 'Your post has been successfully updated.', 'success');
        }
        else {
            this.closeEditModal();
            this.success_alert('Updated!', 'Your post has been successfully updated.', 'success');
        }
    }

    onDelete(post_id) {
        Swal.fire({
            title: 'Delete!',
            text: 'Are you sure you want to delete this post?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if(result.value) {
                this.props.deletePost(post_id);
                this.success_alert('Deleted!', 'Your post has been successfully deleted.', 'success');
            }
        });
    }

    success_alert(title, message, type) {
        Swal.fire(
            title,
            message,
            type
        )
    }

    render() {
        const current_user_id = JSON.parse(localStorage.getItem('user')).id;
        const postItems = this.props.posts.map(post => (
            <div key={ post.id } className='card bg-light text-dark'>
                <div className='card-body'>
                    {current_user_id === post.user_id ? (
                        <>
                            <span className='close' onClick={() => this.onDelete(post.id)}><DeleteIcon className='btnDelete'/></span>
                            <span className='close' onClick={() => this.openEditModal(post) }><EditIcon className='btnEdit'/></span>
                        </>
                    ) :
                        ('')
                    }
                    <h3 style={{ whiteSpace: 'pre-line' }}>{ post.content }</h3>
                    <p>
                        Posted By: { post.name }
                        <br />
                        Date Posted: <Moment format='MMMM DD, YYYY hh:mmA'>
                            { post.created_at }
                        </Moment>
                    </p>
                </div>
            </div>
        )).reverse();

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-7 offset-lg-2'>
                        <div className='card'>
                            <div className='card-body'>
                                <h3 className='text-center' style={{ marginBottom: '20px' }}>Posts</h3>
                                <NewPost />
                                {this.props.fetchInProgress ? (
                                    <div className='text-center'>
                                        <div className='spinner-border' role='status'>
                                            <span className='sr-only'>Loading...</span>
                                        </div> Loading Data...
                                    </div>
                                ) : (
                                    <div className='post-listing'>
                                        { postItems }
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <form className='form'>
                        <Modal show={this.state.show} animation={false} onHide={() => this.closeEditModal()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='form-group'>
                                <textarea defaultValue={this.state.selectedData.content} className='form-control' name='content' style={{resize: 'none'}} rows='6' placeholder='What&apos;s on your mind?' onChange={this.onChange}></textarea>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='success' onClick={() => this.updatePost()}>Save Changes</Button>
                            <Button variant='danger' onClick={() => this.closeEditModal()}>Close</Button>
                        </Modal.Footer>
                        </Modal>
                    </form>
                </div>
            </div>
        );
    }   
}

Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object,
    fetchInProgress: PropTypes.bool,
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    isLoggedIn: state.user.isLoggedIn,
    newPost: state.posts.item,
    fetchInProgress: state.posts.fetchInProgress
});

export default connect(mapStateToProps, { fetchPosts, updatePost, deletePost })(Posts);