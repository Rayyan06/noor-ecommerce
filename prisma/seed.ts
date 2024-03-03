import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    })
  );
}

seed();

function getProducts() {
  return [
    {
      name: 'Picture Frame',
      description: 'Top Quality picture frame in various sizes',
      price: 300,
    },
    {
      name: 'Throw Pillow Set',
      description: 'Luxurious set of throw pillows to enhance your sofa or bed',
      price: 50,
    },
    {
      name: 'Wall Clock',
      description:
        'Elegant wall clock with silent mechanism for a peaceful atmosphere',
      price: 100,
    },

    {
      name: 'Scented Candle Collection',
      description: 'Set of premium scented candles to create a cozy ambiance',
      price: 25,
    },

    {
      name: 'Decorative Vase',
      description:
        'Handcrafted ceramic vase perfect for displaying flowers or as a standalone piece',
      price: 80,
    },

    {
      name: 'Faux Fur Throw Blanket',
      description: 'Soft and plush faux fur throw blanket for chilly evenings',
      price: 70,
    },

    {
      name: 'Artificial Potted Plant',
      description:
        'Realistic artificial plant to add greenery to any space without the hassle of maintenance',
      price: 45,
    },

    {
      name: 'Accent Mirror',
      description:
        'Stylish accent mirror with a sleek frame to brighten up any room',
      price: 120,
    },

    {
      name: 'Table Lamp',
      description:
        'Modern table lamp with adjustable brightness settings for personalized lighting',
      price: 60,
    },

    {
      name: 'Decorative Tray Set',
      description:
        'Set of decorative trays for organizing and displaying items with elegance',
      price: 35,
    },
  ];
}
