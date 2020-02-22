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

var zohar = firebase.database().ref('/');

// https://console.firebase.google.com/u/0/project/math-a7cdc/database/math-a7cdc/data

const RESULT = {
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS'
};

const options = [1, 3, 5, 7, 11, 13, 16];
const App = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState();
  const [prize, setPrize] = useState();
  const [nToUse, setNToUse] = useState();
  const [state, setState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    zohar.on('value', function(snapshot) {
      console.log('ZOHAR:', snapshot.val().users[0]);
      const user = snapshot.val().users[0];
      setUser(user);
      setScore(user.score);
    });

    const nToUseVal = Math.max(
      Math.min(Math.ceil(Math.random() * options.length), level * 2),
      level + 1
    );
    const prize = Math.ceil(Math.random() * options.length * level);
    setNToUse(nToUseVal);
    setPrize(prize);
  }, [level]);

  return user ? (
    <>
      <div>score = {score}</div>
      <div>prize = {prize}</div>
      <div>name = {user.name}</div>
      <div>n = {nToUse} </div>
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
            console.log(result);
            setScore(result === RESULT.SUCCESS ? score + prize : score - prize);
            // setNToUse(Math.ceil(Math.random() * options.length));
          }}
        />
      )}
    </>
  ) : (
    <span>Loading...</span>
  );
};
const Game = ({onFinish, initialOptions, nToUse}) => {
  const [options, setOptions] = useState(initialOptions);
  const [currentSum, setCurrentSum] = useState(nSum(initialOptions, nToUse));
  return (
    <>
      sum = {currentSum}
      <header className="container">
        {options.map(num => (
          <button
            className="num"
            onClick={() => {
              const newSum = currentSum - num;
              if (!hasSolution(options, newSum)) {
                console.log(`hasSolution([${options}], ${newSum})`);
                onFinish(RESULT.FAILED);
                setOptions(initialOptions);
                setCurrentSum(nSum(initialOptions, nToUse));
              } else if (newSum === 0) {
                onFinish(RESULT.SUCCESS);
                setOptions(initialOptions);
                setCurrentSum(nSum(initialOptions, nToUse));
              } else {
                setCurrentSum(newSum);
                setOptions(options.filter(option => option !== num));
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

const Success = () => <div style={{fontSize: 36}}> SUCCESS!!! :) :)</div>;
const Failure = () => <div style={{fontSize: 36}}>Failed!!! :( :( </div>;

export default App;
