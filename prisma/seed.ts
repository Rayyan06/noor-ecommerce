import { PrismaClient } from '@prisma/client';
import path from 'node:path';
import fs from 'node:fs';
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
      console.log('Created! Product: ' + product.name);
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
      imageName: 'PictureFrame.jpg',
      stripeProductId: 'price_1OtXjJDZ94ZbWteP1t4hg5nr',
    },
    {
      name: 'Throw Pillow Set',
      description: 'Luxurious set of throw pillows to enhance your sofa or bed',
      price: 50,
      imageName: 'ThrowPillowSet.jpg',
      stripeProductId: 'price_1OtY2rDZ94ZbWtePntSzMGeo',
    },
    {
      name: 'Wall Clock',
      description:
        'Elegant wall clock with silent mechanism for a peaceful atmosphere',
      price: 100,
      imageName: 'WallClock.jpg',
      stripeProductId: 'price_1OtY2XDZ94ZbWtePmyXejpmD',
    },

    {
      name: 'Faux Fur Throw Blanket',
      description: 'Soft and plush faux fur throw blanket for chilly evenings',
      price: 70,
      imageName: 'FauxFurThrowBlanket.jpg',
      stripeProductId: 'price_1OtY3hDZ94ZbWteP6RtNupxK',
    },
  ];
}
