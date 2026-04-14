import ClassCounter from '../components/ClassCounter';
import FunctionalCounter from '../components/FunctionalCounter';

function Home() {
  return (
    <>
      <section className="hero-card">
        <p className="eyebrow">Welcome to FurniCraft</p>
        <h2>Modern furniture designed for productive commercial spaces.</h2>
        <p className="hero-copy">
          Discover premium desks, ergonomic chairs, storage solutions, and office essentials built to
          bring comfort, style, and efficiency to your workspace.
        </p>
      </section>

      <section className="counters-section">
        <p className="eyebrow">React State Examples</p>
        <h3>Counter Components</h3>
        <div className="counters-grid">
          <ClassCounter />
          <FunctionalCounter />
        </div>
      </section>
    </>
  );
}

export default Home;
