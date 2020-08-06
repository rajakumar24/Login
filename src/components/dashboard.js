import React from 'react';
import { removeUserSession } from './common';

function Dashboard(props) {
  

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  return (
    <div>
      <h1>Welcome</h1> <br />
      <h2>You logged in!</h2>
      <br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;