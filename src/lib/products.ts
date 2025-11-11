
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

function getImageUrl(id: string): string {
  const image = PlaceHolderImages.find(p => p.id === id);
  return image ? image.imageUrl : 'https://placehold.co/600x400';
}

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Prime Ribeye Steak',
    description: 'A well-marbled, juicy, and flavorful cut, perfect for grilling.',
    price: 25.99,
    imageUrl: getImageUrl('beef-steak'),
  },
  {
    id: 'prod_2',
    name: 'Fresh Chicken Wings',
    description: 'Perfect for grilling, frying, or baking with your favorite sauce.',
    price: 8.99,
    imageUrl: getImageUrl('chicken-wings'),
  },
  {
    id: 'prod_3',
    name: 'Thick-Cut Pork Chops',
    description: 'Juicy, bone-in pork chops that are full of flavor.',
    price: 12.49,
    imageUrl: getImageUrl('pork-chops'),
  },
  {
    id: 'prod_4',
    name: 'Wild-Caught Salmon Fillet',
    description: 'A rich and oily fish, packed with omega-3 fatty acids.',
    price: 18.99,
    imageUrl: getImageUrl('salmon-fillet'),
  },
  {
    id: 'prod_5',
    name: 'Raw Whole Chicken',
    description: 'Ideal for a family roast or parting out for various meals.',
    price: 14.99,
    imageUrl: getImageUrl('whole-chicken'),
  },
  {
    id: 'prod_6',
    name: 'Lean Ground Beef',
    description: '90/10 lean ground beef, perfect for burgers, tacos, and meatballs.',
    price: 9.99,
    imageUrl: getImageUrl('ground-beef'),
  },
  {
    id: 'prod_7',
    name: 'Beef Short Ribs',
    description: 'Meaty and tender, ideal for braising or slow cooking.',
    price: 17.99,
    imageUrl: getImageUrl('beef-ribs'),
  },
  {
    id: 'prod_8',
    name: 'Goat Meat Cubes',
    description: 'Tender goat meat cubes, perfect for stews and curries.',
    price: 16.99,
    imageUrl: getImageUrl('goat-meat'),
  },
   {
    id: 'prod_9',
    name: 'Lamb Chops',
    description: 'Tender and flavorful, perfect for grilling or pan-searing.',
    price: 22.99,
    imageUrl: getImageUrl('lamb-chops'),
  },
  {
    id: 'prod_10',
    name: 'Pork Sausage Links',
    description: 'Savory and delicious, great for breakfast or grilling.',
    price: 7.49,
    imageUrl: getImageUrl('pork-sausage'),
  },
  {
    id: 'prod_11',
    name: 'Smoked Bacon',
    description: 'Thick-cut, applewood-smoked bacon for a perfect breakfast.',
    price: 9.99,
    imageUrl: getImageUrl('bacon'),
  },
  {
    id: 'prod_12',
    name: 'Turkey Breast',
    description: 'Boneless, skinless turkey breast, a lean and healthy option.',
    price: 15.99,
    imageUrl: getImageUrl('turkey-breast'),
  },
  {
    id: 'prod_13',
    name: 'Duck Breast',
    description: 'Rich and flavorful duck breast with a crispy skin.',
    price: 24.99,
    imageUrl: getImageUrl('duck-breast'),
  },
  {
    id: 'prod_14',
    name: 'Beef Brisket',
    description: 'A large cut perfect for smoking or slow cooking.',
    price: 35.50,
    imageUrl: getImageUrl('beef-brisket'),
  },
  {
    id: 'prod_15',
    name: 'T-Bone Steak',
    description: 'A classic steak combining a New York strip and a filet.',
    price: 29.99,
    imageUrl: getImageUrl('t-bone-steak'),
  },
  {
    id: 'prod_16',
    name: 'Pork Belly',
    description: 'A fatty, flavorful cut perfect for roasting or braising.',
    price: 13.99,
    imageUrl: getImageUrl('pork-belly'),
  },
  {
    id: 'prod_17',
    name: 'Ground Pork',
    description: 'Versatile ground pork for meatballs, sausages, or stir-fries.',
    price: 6.99,
    imageUrl: getImageUrl('ground-pork'),
  },
];
