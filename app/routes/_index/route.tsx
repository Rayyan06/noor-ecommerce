import Card from './card';

export default function IndexRoute() {
  return (
    <div className="mx-36 space-y-10">
      <Card mainText="Browse our latest products" buttonText="Shop Now" />
      <Card mainText="See more" buttonText="Learn More" />
    </div>
  );
}
