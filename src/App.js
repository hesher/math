import React, {useState, useEffect} from 'react';
import AddToSum from './AddToSum';
import './App.css';
import RESULT from './RESULT';
import selectRandomN from './selectRandomN';
import PlayerChoose from './PlayerChoose';

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

var dbRef = firebase.database().ref('/users/zohar');

// https://console.firebase.google.com/u/0/project/math-a7cdc/database/math-a7cdc/data

const optionalOptions = [2, 3, 5, 7, 9, 11, 13, 17, 19, 23, 25, 31, 37];
const options = selectRandomN(optionalOptions, 9).sort((a, b) => a - b);
const App = () => {
  const [level, setLevel] = useState();
  const [score, setScore] = useState();
  const [prize, setPrize] = useState();
  const [nToUse, setNToUse] = useState();
  const [state, setState] = useState();
  const [username, setUsername] = useState();
  const [simpleMode, setSimpleMode] = useState(false);
  const [gameId, setGameId] = useState(1);
  const [userLogged, setUserLogged] = useState(false);

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

  return !userLogged ? (
    <PlayerChoose
      onSubmit={(user, pass) => {
        // xxxx
      }}
    />
  ) : username ? (
    <span className="app-container">
      <span className="stats-container">
        <div className="stat">${score}</div>
        <div className="stat">${prize}</div>
        <div className="stat">{username}</div>
      </span>
      {state === RESULT.FAILED ? (
        <Failure />
      ) : state === RESULT.SUCCESS ? (
        <Success />
      ) : (
        <AddToSum
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
