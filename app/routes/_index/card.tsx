import { Link } from '@remix-run/react';
import banner from '/images/banner.jpeg';
import Button from '~/components/button';

type CardProps = {
  mainText: string;
  buttonText: string;
};

export default function Card({ mainText, buttonText }: CardProps) {
  return (
    <section className={`mx-auto h-screen shadow-lg`}>
      <div
        className="flex items-center justify-center bg-cover bg-center h-screen"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        {/* <img src={banner} alt={'banner'} className="h-full"></img> */}
        <div className="container mx-auto text-center flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-white mb-2 lg:mb-4">
            {mainText}
          </h1>
          <div className="min-w-2/12">
            <Button to="products">{buttonText}</Button>
          </div>
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
