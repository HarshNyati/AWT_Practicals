import ProductCard from '../components/ProductCard';

const products = [
  {
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    name: 'Ergonomic Chair',
    price: '₹24,999',
    color: 'Black',
    manufacturer: 'Herman Miller',
  },
  {
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80',
    name: 'Standing Desk',
    price: '₹41,999',
    color: 'Walnut Brown',
    manufacturer: 'Flexispot',
  },
  {
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
    name: 'Bookshelf',
    price: '₹16,999',
    color: 'White',
    manufacturer: 'IKEA',
  },
];

function Products() {
  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Our Products</p>
        <h2>Furniture solutions for every professional space</h2>
        <p className="products-intro">
          Browse commercial-grade pieces designed for comfort, durability, and a polished workspace.
        </p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </section>
  );
}

export default Products;
