import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import CustomerReview from './pages/CustomerReview';
import Hooks from './pages/Hooks';
import './App.css';

function App() {
  const helloWorldMessage = 'Hello World';

  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="hello-banner">{helloWorldMessage}</div>
        <Navbar />

        <main className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customer-review" element={<CustomerReview />} />
            <Route path="/hooks" element={<Hooks />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
