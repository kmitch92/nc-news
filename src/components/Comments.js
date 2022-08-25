import axios from 'axios';
import { useEffect, useState } from 'react';

const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isActiveComment, setActiveComment] = useState(false);
  const [textInput, setTextInput] = useState('');

  const handleToggle = () => {
    setActiveComment(!isActiveComment);
  };

  const user = 'tickle122';

  useEffect(() => {
    axios
      .get(
        `https://backend-news-project.herokuapp.com/api/articles/${article_id}/comments`,
        {}
      )
      .then((response) => {
        return response.data;
      })
      .then((comments) => {
        const sortedComments = comments.sort(
          (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at)
        );

        return setComments(sortedComments);
      });
  }, []);

  const currentDate = new Date();

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = { username: user, body: textInput };

    setTextInput('');
    if (params.username && params.body) {
      setComments((curr) => [
        ...curr,
        {
          author: user,
          body: params.body,
          created_at: currentDate.toISOString(),
          comment_id: 999999,
        },
      ]);
      axios.post(
        `https://backend-news-project.herokuapp.com/api/articles/${article_id}/comments`,
        params
      );
    } else {
      window.alert("Your comment can't be empty!");
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();

    console.log(event);

    event.target.parentElement.parentElement.classList.replace(
      'deletable-comment',
      'deleted-comment'
    );
    axios
      .delete(
        `https://backend-news-project.herokuapp.com/api/comments/${event.target.value}`
      )
      .catch(() => {
        window.alert(
          "Sorry, the comment couldn't be deleted, please try again later"
        );
      });
    event.target.parentElement.parentElement.classList.replace(
      'deleted-comment',
      'deletable-comment'
    );
  };

  const handleBodyChange = (event) => {
    event.preventDefault();
    setTextInput(event.target.value);
  };

  return (
    <section className="comments-box">
      <h4>Comments</h4>
      <button className="comments-button" onClick={handleToggle}>
        {isActiveComment ? 'Hide' : 'View'}
      </button>
      {comments.map((comment) => {
        if (comment.author !== user) {
          return (
            <div
              key={comment.comment_id}
              id={'id' + comment.comment_id}
              className={isActiveComment ? 'comment' : 'hidden-comment'}
            >
              <h4>{comment.author}</h4>
              <h4>{comment.created_at}</h4>
              <p>{comment.body}</p>
            </div>
          );
        } else
          return (
            <div
              key={comment.comment_id}
              className={
                isActiveComment ? 'deletable-comment' : 'hidden-comment'
              }
            >
              <h4>{comment.author}</h4>
              <h4>{comment.created_at}</h4>
              <div className="comment-inner">
                <p>{comment.body}</p>
                <button
                  onClick={handleDelete}
                  value={comment.comment_id}
                  className="delete-button"
                >
                  X
                </button>
              </div>
            </div>
          );
      })}
      <button className="comments-button" onClick={handleToggle}>
        View
      </button>
      <form className="comment-form">
        <textarea
          onChange={(event) => {
            handleBodyChange(event);
          }}
          value={textInput}
          className="comment-input"
        />
        <button
          onClick={(event) => handleSubmit(event)}
          className="comment-submit"
        >
          Post
        </button>
      </form>
    </section>
  );
};

export default Comments;
