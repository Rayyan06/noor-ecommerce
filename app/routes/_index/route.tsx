import Card from './card';

export default function IndexRoute() {
  return (
    <div className="mx-0 lg:mx-6 xl:mx-24 space-y-10 lg:space-y-16 mb-16">
      <Card mainText="Browse our latest products" buttonText="Shop Now" />
      <Card mainText="See more" buttonText="Learn More" />
    </div>
  );
}
