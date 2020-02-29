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
              const newChosen = {...chosen, [num]: true};
              setChosen(newChosen);
              const forwardSolution = findSolution(
                initialOptions.filter(curr => !newChosen[curr] && curr !== num),
                newSum
              );

              if (forwardSolution !== null) {
                setSolution([
                  ...Object.entries(newChosen)
                    .filter(([_, isChosen]) => isChosen)
                    .map(([number]) => Number(number)),
                  ...forwardSolution
                ]);
              }

              if (forwardSolution === null) {
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

const findSolution = (options, sum) => {
  if (sum === 0 && options.length === 0) return [];
  if (sum >= 0 && options.length === 0) return null;
  if (sum < 0) return null;

  const left = findSolution(options.slice(1), sum - options[0]);
  if (left !== null) {
    return [options[0], ...left];
  }
  const right = findSolution(options.slice(1), sum);
  if (right !== null) {
    return right;
  }
  return null;
};
