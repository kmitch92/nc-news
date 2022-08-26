import { Link } from 'react-router-dom';

const ErrorPage = ({ err }) => {
  console.log(err);
  if (!err) {
    return (
      <div className="error-page">
        <h1>Sorry!</h1>
        <h2>That destination doesn't exist</h2>
        <Link to="/articles" className="link-button">
          HOME
        </Link>
      </div>
    );
  } else if (err.response.data.msg)
    return (
      <div className="error-page">
        <h1>Sorry!</h1>
        <h2>{err.response.data.msg}</h2>
        <Link to="/articles" className="link-button">
          HOME
        </Link>
      </div>
    );
  else
    return (
      <div className="error-page">
        <h1>Sorry!</h1>
        <h2>Something went wrong</h2>
        <Link to="/articles" className="link-button">
          HOME
        </Link>
      </div>
    );
};

export default ErrorPage;
