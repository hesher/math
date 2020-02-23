import React, {useState, useEffect} from 'react';
import './PlayerChoose.css';
import 'firebase/database';

export default function PlayerChoose({onSubmit}) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  return (
    <span className="player-chooser-container">
      <span className="player-chooser-container-field">
        <label>User</label>
        <input
          type="text"
          value={username}
          onChange={ev => setUsername(ev.target.value)}
        />
      </span>
      <span className="player-chooser-container-field">
        <label>Password</label>
        <input
          type="text"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
        />
      </span>
      <button onClick={() => onSubmit(username, password)}>Submit</button>
    </span>
  );
}
