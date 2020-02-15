import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// function App() {
//   const {
//     reset,
//     onNumSelected,
//     success,
//     failed,
//     sum,
//     prize,
//     money,
//     selected
//   } = useNumSelected();
//   useEffect(() => {
//     reset();
//   }, []);

//   return (
//     <div className="App">
//       {success ? (
//         <Success />
//       ) : failed ? (
//         <Failure />
//       ) : (
//         <span style={{ display: "flex" }}>
//           <span className="stats">
//             <div>Sum = {sum}</div>
//             <div>Prize= ${prize}</div>
//             <div>Money = ${money}</div>
//           </span>
//           <Game
//             selected={selected}
//             onNumSelected={onNumSelected}
//             prize={prize}
//             money={money}
//             sum={sum}
//           />
//         </span>
//       )}
//     </div>
//   );
// }

const RESULT = {
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS'
};

const options = [1, 3, 5, 7, 11, 13, 16];
const App = () => {
  const [score, setScore] = useState(0);
  const [prize, setPrize] = useState(5);
  const [nToUse, setNToUse] = useState(
    Math.ceil(Math.random() * options.length)
  );
  const [state, setState] = useState();

  return (
    <>
      <div>score = {score}</div>
      <div>n = {nToUse} </div>
      {state === RESULT.FAILED ? (
        <span>FAILED</span>
      ) : state === RESULT.SUCCESS ? (
        <span>SUCCESS</span>
      ) : (
        <Game
          nToUse={nToUse}
          initialOptions={options}
          onFinish={result => {
            setState(result);
            setTimeout(() => setState(), 1000);
            console.log(result);
            setScore(result === RESULT.SUCCESS ? score + prize : score - prize);
            setNToUse(Math.ceil(Math.random() * options.length));
          }}
        />
      )}
    </>
  );
};
const Game = ({ onFinish, initialOptions, nToUse }) => {
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
            }}
          >
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

// const useNumSelected = num => {
//   const [selected, add, remove, setSelected] = useSet([]);
//   const [sum, setSum] = useState();
//   const [money, setMoney] = useState(0);
//   const [prize, setPrize] = useState(0);
//   const [totalPrize, setTotalPrize] = useState(0);
//   const [success, setSuccess] = useState(false);
//   const [failed, setFailed] = useState(false);

//   const reset = () => {
//     const theSelected = [1, 3, 5, 7, 11, 13, 16];
//     setSelected(theSelected);
//     setSum(
//       new Array(2)
//         .fill(null)
//         .map(x => Math.floor(Math.random() * theSelected.length))
//         .reduce((i, sum) => sum + theSelected[i], 0)
//     );
//     setPrize(Math.ceil(Math.random() * 5));
//     setSuccess(false);
//     setFailed(false);
//   };

//   const onNumSelected = num => () => {
//     const newScore = sum - num;
//     remove(num);
//     setSum(newScore);
//     if (newScore === 0) {
//       setMoney(money + prize);
//       setTotalPrize(prize + totalPrize);
//       setSuccess(true);
//       setTimeout(() => {
//         reset();
//       }, 1000);
//     } else if (newScore < 0 || cantSum(selected, sum)) {
//       setMoney(money - prize);
//       setFailed(true);
//       setTimeout(() => {
//         reset();
//       }, 1000);
//     }
//   };
//   return { onNumSelected, reset, success, failed, sum, prize, money, selected };
// };

// function useSet(initial = []) {
//   const [selected, setSelected] = useState(initial);
//   const theSet = new Set(selected);

//   return [
//     selected,
//     x => {
//       theSet.add(x);
//       setSelected(Array.from(theSet.values()));
//     },
//     x => {
//       theSet.delete(x);
//       setSelected(Array.from(theSet.values()));
//     },
//     setSelected
//   ];
// }

const Success = () => <div style={{ fontSize: 36 }}> SUCCESS!!! :) :)</div>;
const Failure = () => <div style={{ fontSize: 36 }}>Failed!!! :( :( </div>;

function cantSum(selected, sum) {
  return (
    selected.reduce((x, y) => x + y, 0) < sum || selected.every(x => x > sum)
  );
}

export default App;
