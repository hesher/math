import React, { useState, useEffect } from 'react';
import styles from './QuickCatch.module.css';
import RESULT from './RESULT';
import { motion } from 'framer-motion';

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
        <motion.button
          key={index}
          transition={{ ease: 'easeOut', duration: 5, loop: Infinity }}
          className={styles[`movingBall${index}`]}
          style={{ left: (index / numbers.length) * 1000, top: '50%' }}
          animate={{
            x: [0, 300, 0],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ['20%', '20%', '50%', '50%', '20%'],
            scale: [1, 1.5, 1.5, 1, 1]
          }}
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
        </motion.button>
      ))}
    </span>
  );
}
