export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageId: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageId: string;
  quantity: number;
};
