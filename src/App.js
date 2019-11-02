import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const {
    reset,
    onNumSelected,
    success,
    failed,
    sum,
    prize,
    money,
    selected
  } = useNumSelected();
  useEffect(() => {
    reset();
  }, []);

  return (
    <div className="App">
      {success ? (
        <Success />
      ) : failed ? (
        <Failure />
      ) : (
        <Game
          selected={selected}
          onNumSelected={onNumSelected}
          prize={prize}
          money={money}
          sum={sum}
        />
      )}
    </div>
  );
}
const Game = ({ selected, onNumSelected, prize, money, sum }) => (
  <span style={{ display: "flex" }}>
    <span className="stats">
      <div>Sum = {sum}</div>
      <div>Prize= ${prize}</div>
      <div>Money = ${money}</div>
    </span>
    <header className="container">
      {selected.map(num => (
        <button className="num" onClick={onNumSelected(num)}>
          {num}
        </button>
      ))}
    </header>
  </span>
);

const useNumSelected = num => {
  const [selected, add, remove, setSelected] = useSet([]);
  const [sum, setSum] = useState();
  const [money, setMoney] = useState(0);
  const [prize, setPrize] = useState(0);
  const [totalPrize, setTotalPrize] = useState(0);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const reset = () => {
    const theSelected = [1, 3, 5, 7, 11, 13, 16];
    setSelected(theSelected);
    setSum(theSelected.reduce((x, y) => x + (Math.random() > 0.5 ? y : 0), 0));
    setPrize(Math.ceil(Math.random() * 5));
    setSuccess(false);
    setFailed(false);
  };

  const onNumSelected = num => () => {
    const newScore = sum - num;
    remove(num);
    setSum(newScore);
    if (newScore === 0) {
      setMoney(money + prize);
      setTotalPrize(prize + totalPrize);
      setSuccess(true);
      setTimeout(() => {
        reset();
      }, 1000);
    } else if (newScore < 0 || cantSum(selected, sum)) {
      setMoney(money - prize);
      setFailed(true);
      setTimeout(() => {
        reset();
      }, 1000);
    }
  };
  return { onNumSelected, reset, success, failed, sum, prize, money, selected };
};

function useSet(initial = []) {
  const [selected, setSelected] = useState(initial);
  const theSet = new Set(selected);

  return [
    selected,
    x => {
      theSet.add(x);
      setSelected(Array.from(theSet.values()));
    },
    x => {
      theSet.delete(x);
      setSelected(Array.from(theSet.values()));
    },
    setSelected
  ];
}

const Success = () => <div style={{ fontSize: 36 }}> SUCCESS!!! :) :)</div>;
const Failure = () => <div style={{ fontSize: 36 }}>Failed!!! :( :( </div>;

function cantSum(selected, sum) {
  return (
    selected.reduce((x, y) => x + y, 0) < sum || selected.every(x => x > sum)
  );
}

export default App;
