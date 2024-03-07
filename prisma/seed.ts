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
      imageUrl: 'images/PictureFrame.jpg',
    },
    {
      name: 'Throw Pillow Set',
      description: 'Luxurious set of throw pillows to enhance your sofa or bed',
      price: 50,
      imageUrl: 'images/ThrowPillowSet.jpg',
    },
    {
      name: 'Wall Clock',
      description:
        'Elegant wall clock with silent mechanism for a peaceful atmosphere',
      price: 100,
      imageUrl: 'images/WallClock.jpg',
    },

    {
      name: 'Faux Fur Throw Blanket',
      description: 'Soft and plush faux fur throw blanket for chilly evenings',
      price: 70,
      imageUrl: 'images/FauxFurThrowBlanket.jpg',
    },
  ];
}
