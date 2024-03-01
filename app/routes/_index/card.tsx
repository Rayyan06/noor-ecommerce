export default function Card({ mainText, buttonText, backgroundColor }) {
  return (
    <section
      className={`mx-auto overflow-hidden h-screen shadow-lg ${backgroundColor}`}
    >
      <div
        className="flex items-center bg-cover bg-center h-full"
        style={{
          backgroundImage:
            'url("https://dummyimage.com/2000x700/969696/8c8c8c.jpg&text=Insert+Image+here")',
        }}
      >
        <div className="container mx-auto text-center text-black">
          <h1 className="text-6xl font-serif">{mainText}</h1>
          <button className="py-2 px-4 bg-orange-400 hover:bg-orange-700 font-bold font-serif text-white rounded mt-2">
            {buttonText}
          </button>
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
