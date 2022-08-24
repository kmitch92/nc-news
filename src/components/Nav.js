import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="nav">
      <span className="you-user">
        <span className="display-pic">
          <img src="" alt="" />
        </span>
        <h2>YOU</h2>
      </span>

      <span>
        <Link className="nav-button" to={'/users'}>
          <h2>USERS</h2>
        </Link>
      </span>
    </div>
  );
};

export default Nav;
