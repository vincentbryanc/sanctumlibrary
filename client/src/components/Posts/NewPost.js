import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../../actions/postActions';

class NewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        
        if (this.state.content === '') {
            alert('Content is required');
        }
        else {
            const post = {
                content: this.state.content,
                user_id: JSON.parse(localStorage.getItem('user')).id,
            }
            this.props.createPost(post);
            this.setState({
                content: '',
            });
        }
    }

    render() {
        return (
            <form className='form'>
                <div className='form-group'>
                    <textarea value={this.state.content} className='form-control' style={{ resize: 'none' }} name='content' rows='5' placeholder='What&apos;s on your mind?' onChange={this.onChange}></textarea>
                </div>
                <div className='form-group text-right'>
                    {this.props.createInProgress ? (
                        <input type='submit' className='btn btn-primary' value='Post Now' onClick={this.onSubmit} disabled />
                    ) : (
                        <input type='submit' className='btn btn-primary' value='Post Now' onClick={this.onSubmit} />
                    )}
                </div>
            </form>
        );
    }
}

NewPost.propTypes = {
    createInProgress: PropTypes.bool,
}

const mapStateToProps = state => ({
    createInProgress: state.posts.createInProgress,
});

export default connect(mapStateToProps, { createPost })(NewPost);