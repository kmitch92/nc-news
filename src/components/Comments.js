import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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
      axios
        .post(
          `https://backend-news-project.herokuapp.com/api/articles/${article_id}/comments`,
          params
        )
        .then((response) => {
          console.log(response);
        });
    } else {
      window.alert("Your comment can't be empty!");
    }
  };

  const handleBodyChange = (event) => {
    event.preventDefault();
    setTextInput(event.target.value);
    console.log('textInput at handleBodyChange', textInput);
  };

  return (
    <section className="comments-box">
      <h4>Comments</h4>
      {comments.map((comment) => {
        return (
          <div
            onClick={handleToggle}
            key={comment.comment_id}
            className={isActiveComment ? 'comment' : 'hidden-comment'}
          >
            <h4>{comment.author}</h4>
            <h4>{comment.created_at}</h4>
            <p>{comment.body}</p>
          </div>
        );
      })}
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
