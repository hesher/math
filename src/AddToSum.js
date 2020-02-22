import React, {useState, useEffect} from 'react';
import RESULT from './RESULT';
import selectRandomN from './selectRandomN';

export default function AddToSum({onFinish, initialOptions, nToUse, gameId}) {
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
    <span className="big-game-container">
      <span className="game-sum">{currentSum}</span>
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
                  initialOptions.filter(curr => !chosen[curr] && curr !== num),
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
}

const makeSolution = (arr, n) => selectRandomN(arr, n);

const hasSolution = (options, sum) => {
  if (sum === 0) return true;
  if (sum > 0 && options.length === 0) return false;
  if (sum < 0) return false;

  return (
    hasSolution(options.slice(1), sum - options[0]) ||
    hasSolution(options.slice(1), sum)
  );
};
