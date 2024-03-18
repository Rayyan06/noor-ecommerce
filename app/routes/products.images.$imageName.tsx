import { LoaderFunctionArgs } from '@vercel/remix';
import fs from 'fs';
import path from 'path';

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.imageName)
    return new Response('No Image Url Provided', { status: 404 });

  const imagePath = path.join('public', 'images', params.imageName); // Adjust the path according to your file structure
  try {
    // Read the image file
    const image = fs.readFileSync(imagePath);

    // Return the image content along with appropriate headers
    return new Response(image, {
      headers: {
        'Content-Type': 'image/jpg', // Adjust the content type based on your image format
      },
    });
  } catch (error) {
    console.error('Error reading image file:', error);
    return new Response('Image not found', { status: 404 });
  }
}
