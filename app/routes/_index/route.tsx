import Card from './card';

export default function IndexRoute() {
  return (
    <main className="mx-36 space-y-10">
      <Card mainText="Browse our latest products" buttonText="Shop Now" />
      <Card mainText="View other products" buttonText="View now" />
    </main>
  );
}
