import { useState } from 'react';

function FunctionalCounter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="counter-box functional-counter">
      <h3>Functional Counter (Using useState Hook)</h3>
      <p className="counter-display">{count}</p>
      <div className="counter-buttons">
        <button onClick={increment} className="btn btn-increment">
          + Increment
        </button>
        <button onClick={decrement} className="btn btn-decrement">
          - Decrement
        </button>
        <button onClick={reset} className="btn btn-reset">
          ↻ Reset
        </button>
      </div>
    </div>
  );
}

export default FunctionalCounter;
