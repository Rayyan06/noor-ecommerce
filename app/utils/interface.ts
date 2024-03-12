export interface Product {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  price: number;
  imageName?: string | null;
  cartItems?: CartItem[];
  stripeProductId: string;
}

export interface Cart {
  id: number;
  items: CartItem[];
}

export interface CartItem {
  id: string;
  cartId: number;
  productId: string;
  cart?: Cart;
  product: Product;
  quantity: number;
}
