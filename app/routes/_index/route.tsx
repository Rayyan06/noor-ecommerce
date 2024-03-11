import Card from './card';

export default function IndexRoute() {
  return (
    <div className="mx-0 md:mx-16 lg:mx-24 space-y-10">
      <Card mainText="Browse our latest products" buttonText="Shop Now" />
      <Card mainText="See more" buttonText="Learn More" />
    </div>
  );
}
