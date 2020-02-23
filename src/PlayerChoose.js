import React, {useState} from 'react';
import './PlayerChoose.css';

export default function PlayerChoose({onSubmit}) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  return (
    <span className="player-chooser-container">
      <form
        onSubmit={ev => {
          ev.preventDefault();
          onSubmit(username, password);
        }}>
        <span className="player-chooser-container-field">
          <label>User</label>
          <input
            name="username"
            type="text"
            onChange={ev => setUsername(ev.target.value)}
          />
        </span>
        <span className="player-chooser-container-field">
          <label>Password</label>
          <input type="text" onChange={ev => setPassword(ev.target.value)} />
        </span>
        <input type="submit" value="Submit" />
      </form>
    </span>
  );
}
