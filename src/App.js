import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app';
import 'firebase/database';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC8ZXJBanm83WVhdbYnrSR_gV7QDNR7NzY',
  authDomain: 'math-a7cdc.firebaseapp.com',
  databaseURL: 'https://math-a7cdc.firebaseio.com',
  projectId: 'math-a7cdc',
  storageBucket: 'math-a7cdc.appspot.com',
  messagingSenderId: '438256651307',
  appId: '1:438256651307:web:2bde54ba227715a1d7ee6e',
  measurementId: 'G-HG898MJZF7'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var zohar = firebase.database().ref('/users/zohar');

// https://console.firebase.google.com/u/0/project/math-a7cdc/database/math-a7cdc/data

const RESULT = {
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS'
};

const options = [1, 3, 5, 7, 11, 13, 16];
const App = () => {
  const [level, setLevel] = useState();
  const [score, setScore] = useState();
  const [prize, setPrize] = useState();
  const [nToUse, setNToUse] = useState();
  const [state, setState] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    zohar.on('value', function(snapshot) {
      const user = snapshot.val();
      setUsername(user.name);
      setScore(user.score);
      setLevel(user.level);
    });

    const minN = level + 1;
    const maxN = Math.min(options.length, (level + 1) * 2);
    const nToUseVal = Math.ceil(Math.random() * (maxN - minN)) + minN;
    const prize = Math.ceil(Math.random() * options.length * level);
    setNToUse(nToUseVal);
    setPrize(prize);
  }, [username, score, level]);

  return username ? (
    <span className="app-container">
      <span className="stats-container">
        <div className="stat">score = {score}</div>
        <div className="stat">prize = {prize}</div>
        <div className="stat">name = {username}</div>
        <div className="stat">n = {nToUse} </div>
      </span>
      {state === RESULT.FAILED ? (
        <Failure />
      ) : state === RESULT.SUCCESS ? (
        <Success />
      ) : (
        <Game
          nToUse={nToUse}
          initialOptions={options}
          onFinish={result => {
            setState(result);
            setTimeout(() => setState(), 1000);
            const newScore =
              result === RESULT.SUCCESS ? score + prize : score - prize;
            firebase
              .database()
              .ref('users/zohar')
              .update({
                score: newScore
              });
          }}
        />
      )}
    </span>
  ) : (
    <span>Loading...</span>
  );
};
const Game = ({onFinish, initialOptions, nToUse}) => {
  const [currentSum, setCurrentSum] = useState(nSum(initialOptions, nToUse));
  const [chosen, setChosen] = useState({});
  return (
    <>
      sum = {currentSum}
      <header className="game-container">
        {initialOptions.map(num => (
          <button
            className={`num ${chosen[num] ? 'disabled' : ''}`}
            disabled={chosen[num]}
            onClick={() => {
              const newSum = currentSum - num;
              setChosen({...chosen, [num]: true});
              if (
                !hasSolution(
                  options.filter(num => !chosen[num]),
                  newSum
                )
              ) {
                console.log(`hasSolution([${options}], ${newSum})`);
                onFinish(RESULT.FAILED);
                setCurrentSum(nSum(initialOptions, nToUse));
              } else if (newSum === 0) {
                onFinish(RESULT.SUCCESS);
                setCurrentSum(nSum(initialOptions, nToUse));
              } else {
                setCurrentSum(newSum);
              }
            }}>
            {num}
          </button>
        ))}
      </header>
    </>
  );
};

const nSum = (arr, n) => randomlySelectN(arr, n).reduce((x, y) => x + y, 0);

function randomlySelectN(array, n) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  return shuffled.slice(0, n);
}

const hasSolution = (options, sum) => {
  if (sum === 0) return true;
  if (sum > 0 && options.length === 0) return false;
  if (sum < 0) return false;

  return (
    hasSolution(options.slice(1), sum - options[0]) ||
    hasSolution(options.slice(1), sum)
  );
};

const Success = () => (
  <div className="game-container" style={{fontSize: 36}}>
    SUCCESS!!! :) :)
  </div>
);
const Failure = () => (
  <div className="game-container" style={{fontSize: 36}}>
    Failed!!! :( :(
  </div>
);

export default App;
