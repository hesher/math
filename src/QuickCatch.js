import React, { useState, useEffect } from 'react';
import styles from './QuickCatch.module.css';
import RESULT from './RESULT';

export default function QuickCatch({ gameId, onFinish }) {
  const [numbers, setNumbers] = useState([]);
  //   const [timer, setTimer] = useState();

  useEffect(() => {
    const newNumbers = [
      Math.ceil(Math.random() * 10),
      Math.ceil(Math.random() * 10)
    ];

    newNumbers.push(
      Math.ceil(Math.random() * 10) +
        (newNumbers.every(number => number <= 5) ? 5 : 0)
    );
    setNumbers(newNumbers);
    // if (timer) {
    //   clearTimeout(timer);
    // }
    // setTimeout(() => {
    //   onFinish(
    //     newNumbers.every(number => number <= 5) ? RESULT.SUCCESS : RESULT.FAILED
    //   );
    // }, 5000);
  }, [gameId]);
  return (
    <span className={styles.quickCatchContainer}>
      {numbers.map((number, index) => (
        <button
          key={index}
          className={styles[`movingBall${index}`]}
          onClick={() => {
            // clearTimeout(timer);
            if (number > 5) {
              onFinish(RESULT.SUCCESS);
            } else {
              onFinish(RESULT.FAILED);
            }
          }}
        >
          {number}
        </button>
      ))}
    </span>
  );
}
