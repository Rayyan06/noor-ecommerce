import ProductCard from './productCard';

export default function Products() {
  return (
    <div className="grid h-screen">
      <h1>All Products</h1>
      <ProductCard name={'Wood Carving'} price={100} />
    </div>
  );
}
