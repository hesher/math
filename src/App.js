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

var dbRef = firebase.database().ref('/users/jonathan');

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
  const [simpleMode, setSimpleMode] = useState(false);
  const [gameId, setGameId] = useState(1);

  useEffect(() => {
    dbRef.on('value', function(snapshot) {
      const user = snapshot.val();
      setUsername(user.name);
      setScore(user.score);
      setLevel(user.level);
      setSimpleMode(user.simpleMode);
    });

    const minN = level + 1;
    const maxN = Math.min(options.length, (level + 1) * 2);
    const nToUseVal = simpleMode
      ? 1
      : Math.ceil(Math.random() * (maxN - minN)) + minN;
    const prize = Math.ceil(Math.random() * options.length * level);
    setNToUse(nToUseVal);
    setPrize(prize);
  }, [username, score, level, simpleMode]);

  return username ? (
    <span className="app-container">
      <span className="stats-container">
        <div className="stat">{score}</div>
        <div className="stat">${prize}</div>
        <div className="stat">{username}</div>
      </span>
      {state === RESULT.FAILED ? (
        <Failure />
      ) : state === RESULT.SUCCESS ? (
        <Success />
      ) : (
        <Game
          nToUse={nToUse}
          initialOptions={options}
          gameId={gameId}
          onFinish={result => {
            setState(result);
            setTimeout(() => {
              setState();
              setGameId(gameId + 1);
            }, 2000);
            const newScore =
              result === RESULT.SUCCESS ? score + prize : score - prize;
            dbRef.update({
              score: newScore
            });
          }}
        />
      )}
    </span>
  ) : (
    <span>Loadings...</span>
  );
};
const Game = ({onFinish, initialOptions, nToUse, gameId}) => {
  const [solution, setSolution] = useState();
  const [currentSum, setCurrentSum] = useState();
  const [chosen, setChosen] = useState({});
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    const sol = makeSolution(initialOptions, nToUse);
    setSolution(sol);
    setCurrentSum(sol.reduce((x, y) => x + y, 0));
  }, [gameId, initialOptions, nToUse]);
  return (
    <span>
      Sum = {currentSum}
      <header className="game-container">
        {initialOptions.map(num => (
          <button
            className={`num ${chosen[num] ? 'disabled' : ''} ${
              showSolution && solution.includes(num) ? 'part-of-solution' : ''
            }`}
            disabled={chosen[num]}
            onClick={() => {
              const newSum = currentSum - num;
              setChosen({...chosen, [num]: true});
              if (
                !hasSolution(
                  options.filter(curr => !chosen[curr] && curr !== num),
                  newSum
                )
              ) {
                setTimeout(() => onFinish(RESULT.FAILED), 2000);
                setShowSolution(true);
              } else if (newSum === 0) {
                onFinish(RESULT.SUCCESS);
              } else {
                setCurrentSum(newSum);
              }
            }}>
            {num}
          </button>
        ))}
      </header>
    </span>
  );
};

const makeSolution = (arr, n) => randomlySelectN(arr, n);

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
