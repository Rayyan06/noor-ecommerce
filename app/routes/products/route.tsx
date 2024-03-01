import ProductCard from './productCard';

export default function Products() {
  return (
    <div className="grid grid-cols-3 gap-3 justify-center h-screen overflow-auto">
      <ProductCard name={'Picture Frame'} price={100} />
      <ProductCard name={'Example 2'} price={200} />
      <ProductCard name={'Example 3'} price={300} />
      <ProductCard name={'Example 4'} price={400} />
      <ProductCard name={'Example 5'} price={500} />
      <ProductCard name={'Example 6'} price={500} />
    </div>
  );
}
