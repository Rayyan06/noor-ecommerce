import { Link } from '@remix-run/react';

type CardProps = {
  mainText: string;
  buttonText: string;
};

export default function Card({ mainText, buttonText }: CardProps) {
  return (
    <section className={`mx-auto h-screen shadow-lg`}>
      <div
        className="flex items-center bg-cover bg-center h-screen"
        style={{
          backgroundImage:
            'url("https://dummyimage.com/2000x700/969696/8c8c8c.jpg&text=Insert+Image+here")',
        }}
      >
        <div className="container mx-auto text-center text-black">
          <h1 className="text-6xl font-semibold">{mainText}</h1>
          <Link
            className="py-2 px-5 bg-blue-400 shadow-md hover:bg-orange-700 font-bold font-serif text-white rounded "
            to="products"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
    //   <div className="max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
    //   <div
    //     className="h-64 bg-cover bg-center"
    //     style={{
    //       backgroundImage: "url('path/to/your/image.jpg')",
    //     }}
    //   ></div>
    //   <div className="p-6">
    //     <h2 className="text-2xl font-bold mb-4">
    //       Browse our latest collection
    //     </h2>
    //     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    //       Shop Now
    //     </button>
    //   </div>
    // </div>
  );
}
