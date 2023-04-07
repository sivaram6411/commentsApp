import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    InputName: '',
    InputComment: '',
    CommentsList: [],
  }

  DeleteComment = id => {
    this.setState(prevState => ({
      CommentsList: prevState.CommentsList.filter(eachId => eachId.id !== id),
    }))
  }

  toggleLikeButton = id => {
    this.setState(prevState => ({
      CommentsList: prevState.CommentsList.map(eachLike => {
        if (eachLike.id === id) {
          return {...eachLike, isLike: !eachLike.isLike}
        }
        return {...eachLike}
      }),
    }))
  }

  renderCommentsList = () => {
    const {CommentsList} = this.state

    return CommentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleLikeButton={this.toggleLikeButton}
        DeleteComment={this.DeleteComment}
      />
    ))
  }

  onSubmitButton = event => {
    event.preventDefault()
    const {InputName, InputComment} = this.state
    const initialBackgroundColor = `initial ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * (initialContainerBackgroundClassNames.length - 1),
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name: InputName,
      comment: InputComment,
      date: new Date(),
      isLike: false,
      initialClassName: initialBackgroundColor,
    }

    this.setState(prevState => ({
      CommentsList: [...prevState.CommentsList, newComment],
      InputName: '',
      InputComment: '',
    }))
  }

  onChangeInputName = event => {
    this.setState({InputName: event.target.value})
  }

  onChangeComment = event => {
    this.setState({InputComment: event.target.value})
  }

  render() {
    const {InputName, InputComment, CommentsList} = this.state

    return (
      <div className="container">
        <div>
          <h1 className="main-heading">Comments</h1>
          <div className="sub-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comment-image"
            />
            <form className="form-container" onSubmit={this.onSubmitButton}>
              <label className="content" htmlFor="name">
                Say something about 4.0 Technologies
              </label>
              <input
                type="text"
                className="input"
                id="name"
                placeholder="Your Name"
                onChange={this.onChangeInputName}
                value={InputName}
              />
              <textarea
                className="text-area"
                cols="50"
                rows="5"
                placeholder="Your Comment"
                onChange={this.onChangeComment}
                value={InputComment}
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
          </div>
          <hr className="hr-line" />
          <div className="comments-count-container">
            <p className="comments-count">{CommentsList.length}</p>
            <p className="comments">Comments</p>
          </div>
          <ul>{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
