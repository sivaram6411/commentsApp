// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleLikeButton, DeleteComment} = props
  const {id, name, comment, isLike, date, initialClassName} = commentDetails
  const initialName = name ? name[0].toUppercase() : ''
  const updateTime = formatDistanceToNow(date)
  const LikeButton = isLike ? 'active-button' : 'normal-button'
  const LikeImage = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onLikeButton = () => {
    toggleLikeButton(id)
  }

  const onDeleteButton = () => {
    DeleteComment(id)
  }

  return (
    <li className="list">
      <div className="comment-container">
        <div>
          <div className="name-comment">
            <div className={initialClassName}>
              <p>{initialName}</p>
            </div>
            <div className="name-time">
              <p className="name">{name}</p>
              <p className="time">{`${updateTime} ago`}</p>
            </div>
          </div>
          <p className="comment">{comment}</p>
        </div>
        <div className="like-delete">
          <div className="like-image-like-btn-container">
            <img src={LikeImage} alt="like" className="like-image" />
            <button className={LikeButton} type="button" onClick={onLikeButton}>
              Like
            </button>
          </div>
          <button
            className="dlt-button"
            type="button"
            data-testid="delete"
            onClick={onDeleteButton}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
              alt="delete"
              className="dlt-image"
            />
          </button>
        </div>
        <hr className="hr-line" />
      </div>
    </li>
  )
}

export default CommentItem
