import React, {useState, useEffect} from 'react';
import styles from './LeaderBoard.module.css';

import * as firebase from 'firebase/app';
import 'firebase/database';

export default function LeaderBoard() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const usersRef = firebase.database().ref(`/users/`);
    usersRef.on('value', function(snapshot) {
      setUsers(
        Object.values(snapshot.val()).sort((u1, u2) => u2.score - u1.score)
      );
    });
  }, []);
  return (
    <span className={styles.leaderBoardContainer}>
      <ul className={styles.list}>
        {users.map((user, index) => (
          <li className={styles.listItem}>
            <span className={`${styles.listItemComponent} ${styles.index}`}>
              {index + 1}
            </span>
            <span className={`${styles.listItemComponent} ${styles.name}`}>
              {user.name}
            </span>
            <span className={`${styles.listItemComponent} ${styles.score}`}>
              {' '}
              {user.score}
            </span>
          </li>
        ))}
      </ul>
    </span>
  );
}
