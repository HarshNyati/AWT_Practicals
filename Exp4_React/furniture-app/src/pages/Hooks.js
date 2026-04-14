import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';

const ThemeContext = createContext();

const initialProducts = [
  { id: 1, name: 'Ergonomic Chair', price: 24999 },
  { id: 2, name: 'Standing Desk', price: 41999 },
  { id: 3, name: 'Bookshelf', price: 16999 },
];

function useDefaultValue(value, defaultValue) {
  return value ? value : defaultValue;
}

const cartInitialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case 'REMOVE_ITEM': {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index === -1) {
        return state;
      }
      const nextItems = [...state.items];
      nextItems.splice(index, 1);
      return {
        ...state,
        items: nextItems,
      };
    }
    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}

function ThemePanel() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={`hook-card theme-panel ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      <h3>useContext: Theme Switcher</h3>
      <p>Current Theme: {theme}</p>
      <button className="hook-btn" onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

function Hooks() {
  const [cartState, dispatch] = useReducer(cartReducer, cartInitialState);
  const [productData, setProductData] = useState(initialProducts);
  const [theme, setTheme] = useState('light');
  const [clickCount, setClickCount] = useState(0);
  const [rerenderCount, setRerenderCount] = useState(0);
  const [clock, setClock] = useState(new Date());
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [fetchStatus, setFetchStatus] = useState('Loading data...');
  const [optionalInput, setOptionalInput] = useState('');
  const callbackReferenceCount = useRef(0);

  const totalPrice = useMemo(() => {
    console.log('useMemo recalculating total price...');
    return productData.reduce((sum, product) => sum + product.price, 0);
  }, [productData]);

  const incrementWithCallback = useCallback(() => {
    setClickCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    callbackReferenceCount.current += 1;
    console.log('useCallback function reference updated:', callbackReferenceCount.current);
  }, [incrementWithCallback]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (active) {
          setFetchedUsers(data);
          setFetchStatus('Fetched sample user data successfully.');
        }
      } catch (error) {
        if (active) {
          setFetchStatus(`Fetch error: ${error.message}`);
        }
      }
    }

    loadUsers();
    return () => {
      active = false;
    };
  }, []);

  const effectiveValue = useDefaultValue(optionalInput, 'Default furniture note');

  const addCartItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeCartItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const updateFirstProductPrice = () => {
    setProductData((prev) =>
      prev.map((item, idx) => (idx === 0 ? { ...item, price: item.price + 1000 } : item))
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <section>
        <div className="section-heading">
          <p className="eyebrow">React Hooks Playground</p>
          <h2>useReducer, useMemo, useCallback, useContext, useEffect, and Custom Hook</h2>
        </div>

        <div className="hooks-grid">
          <div className="hook-card">
            <h3>useReducer: Shopping Cart</h3>
            <div className="inline-actions">
              {productData.map((product) => (
                <button key={product.id} className="hook-btn" onClick={() => addCartItem(product)}>
                  Add {product.name}
                </button>
              ))}
              <button className="hook-btn hook-btn-secondary" onClick={clearCart}>Clear Cart</button>
            </div>
            <p><strong>Total Cart Items:</strong> {cartState.items.length}</p>
            <ul className="hook-list">
              {cartState.items.map((item, idx) => (
                <li key={`${item.id}-${idx}`}>
                  <span>{item.name}</span>
                  <button className="hook-btn hook-btn-secondary" onClick={() => removeCartItem(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="hook-card">
            <h3>useMemo: Total Product Price</h3>
            <p>Memoized Total Value: Rs. {totalPrice.toLocaleString('en-IN')}</p>
            <button className="hook-btn" onClick={() => setRerenderCount((v) => v + 1)}>
              Trigger Re-render ({rerenderCount})
            </button>
            <button className="hook-btn hook-btn-secondary" onClick={updateFirstProductPrice}>
              Change Product Data
            </button>
            <p className="hook-note">Open browser console to see recalculation logs.</p>
          </div>

          <div className="hook-card">
            <h3>useCallback: Memoized Click Handler</h3>
            <button className="hook-btn" onClick={incrementWithCallback}>Click Me</button>
            <p>Counter using memoized callback: {clickCount}</p>
            <p className="hook-note">Console shows callback reference updates.</p>
          </div>

          <ThemePanel />

          <div className="hook-card">
            <h3>useEffect: Data Fetch + Live Clock</h3>
            <p><strong>Current Time:</strong> {clock.toLocaleTimeString()}</p>
            <p>{fetchStatus}</p>
            <ul className="hook-list">
              {fetchedUsers.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </div>

          <div className="hook-card">
            <h3>Custom Hook: useDefaultValue</h3>
            <label htmlFor="custom-hook-input" className="hook-label">Optional Input</label>
            <input
              id="custom-hook-input"
              className="hook-input"
              value={optionalInput}
              onChange={(e) => setOptionalInput(e.target.value)}
              placeholder="Leave empty to use default"
            />
            <p><strong>Resolved Value:</strong> {effectiveValue}</p>
          </div>
        </div>
      </section>
    </ThemeContext.Provider>
  );
}

export default Hooks;
