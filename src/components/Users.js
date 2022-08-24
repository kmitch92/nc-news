import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('https://backend-news-project.herokuapp.com/api/users')
      .then((response) => {
        return response.data;
      })
      .then((users) => {
        return setUsers(users);
      });
  }, []);

  return (
    <div className="users-page">
      <Link to="/articles" className="link-button">
        HOME
      </Link>
      <section className="users">
        {users.map((user, index) => {
          return (
            <div className="user" key={index}>
              <img className="user-img" src={user.avatar_url} />
              <div className="user-info">
                <h4>{user.username}</h4>
                <h4>Real Name: {user.name}</h4>

                <p>lorem20</p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Users;
