import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <span className="brand-mark">F</span>
        <div>
          <h1>FurniCraft</h1>
          <p>Commercial Furniture Store</p>
        </div>
      </div>

      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Products
        </NavLink>
        <NavLink
          to="/customer-review"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Customer Review
        </NavLink>
        <NavLink to="/hooks" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Hooks
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
