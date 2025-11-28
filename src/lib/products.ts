import type { Product } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

const getImageUrl = (id: string) => {
  const image = PlaceHolderImages.find(p => p.id === id);
  return image?.imageUrl || 'https://placehold.co/600x400';
}

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Prime Ribeye Steak',
    description: 'A well-marbled, juicy, and flavorful cut, perfect for grilling.',
    price: 25.99,
    imageUrl: getImageUrl('t-bone-steak'),
    category: 'beef'
  },
  {
    id: 'prod_2',
    name: 'Fresh Chicken Wings',
    description: 'Perfect for grilling, frying, or baking with your favorite sauce.',
    price: 8.99,
    imageUrl: getImageUrl('chicken-wings'),
    category: 'chicken'
  },
  {
    id: 'prod_3',
    name: 'Thick-Cut Pork Chops',
    description: 'Juicy, bone-in pork chops that are full of flavor.',
    price: 12.49,
    imageUrl: getImageUrl('pork-chops'),
    category: 'pork'
  },
  {
    id: 'prod_4',
    name: 'Wild-Caught Salmon Fillet',
    description: 'A rich and oily fish, packed with omega-3 fatty acids.',
    price: 18.99,
    imageUrl: getImageUrl('salmon-fillet'),
    category: 'fish'
  },
  {
    id: 'prod_5',
    name: 'Raw Whole Chicken',
    description: 'Ideal for a family roast or parting out for various meals.',
    price: 14.99,
    imageUrl: getImageUrl('whole-chicken'),
    category: 'chicken'
  },
  {
    id: 'prod_6',
    name: 'Lean Ground Beef',
    description: '90/10 lean ground beef, perfect for burgers, tacos, and meatballs.',
    price: 9.99,
    imageUrl: getImageUrl('ground-beef'),
    category: 'beef'
  },
  {
    id: 'prod_7',
    name: 'Beef Short Ribs',
    description: 'Meaty and tender, ideal for braising or slow cooking.',
    price: 17.99,
    imageUrl: getImageUrl('beef-ribs'),
    category: 'beef'
  },
  {
    id: 'prod_8',
    name: 'Goat Meat Cubes',
    description: 'Tender goat meat cubes, perfect for stews and curries.',
    price: 16.99,
    imageUrl: getImageUrl('goat-meat'),
    category: 'other'
  },
  {
    id: 'prod_9',
    name: 'Lamb Chops',
    description: 'Tender and flavorful, perfect for grilling or pan-searing.',
    price: 22.99,
    imageUrl: getImageUrl('lamb-chops'),
    category: 'lamb'
  },
  {
    id: 'prod_10',
    name: 'Pork Sausage Links',
    description: 'Savory and delicious, great for breakfast or grilling.',
    price: 7.49,
    imageUrl: getImageUrl('pork-sausage'),
    category: 'pork'
  },
  {
    id: 'prod_11',
    name: 'Smoked Bacon',
    description: 'Thick-cut, applewood-smoked bacon for a perfect breakfast.',
    price: 9.99,
    imageUrl: getImageUrl('bacon'),
    category: 'pork'
  },
  {
    id: 'prod_12',
    name: 'Turkey Breast',
    description: 'Boneless, skinless turkey breast, a lean and healthy option.',
    price: 15.99,
    imageUrl: getImageUrl('turkey-breast'),
    category: 'poultry'
  },
  {
    id: 'prod_13',
    name: 'Duck Breast',
    description: 'Rich and flavorful duck breast with a crispy skin.',
    price: 24.99,
    imageUrl: getImageUrl('duck-breast'),
    category: 'poultry'
  },
  {
    id: 'prod_14',
    name: 'Beef Brisket',
    description: 'A large cut perfect for smoking or slow cooking.',
    price: 35.50,
    imageUrl: getImageUrl('beef-brisket'),
    category: 'beef'
  },
  {
    id: 'prod_15',
    name: 'T-Bone Steak',
    description: 'A classic steak combining a New York strip and a filet.',
    price: 29.99,
    imageUrl: getImageUrl('t-bone-steak'),
    category: 'beef'
  },
  {
    id: 'prod_16',
    name: 'Pork Belly',
    description: 'A fatty, flavorful cut perfect for roasting or braising.',
    price: 13.99,
    imageUrl: getImageUrl('pork-belly'),
    category: 'pork'
  },
  {
    id: 'prod_17',
    name: 'Ground Pork',
    description: 'Versatile ground pork for meatballs, sausages, or stir-fries.',
    price: 6.99,
    imageUrl: getImageUrl('ground-pork'),
    category: 'pork'
  },
  {
    id: 'prod_18',
    name: "Cow's Meat",
    description: "Fresh cuts of cow's meat, perfect for stews and slow cooking.",
    price: 11.99,
    imageUrl: getImageUrl('cows-meat'),
    category: 'beef'
  },
  {
    id: 'prod_19',
    name: 'Sheep Meat (Mutton)',
    description: 'Rich, flavorful sheep meat, ideal for hearty stews and roasts.',
    price: 14.50,
    imageUrl: getImageUrl('sheep-meat'),
    category: 'lamb'
  },
  {
    id: 'prod_20',
    name: 'Chicken Breast',
    description: 'Lean and versatile boneless, skinless chicken breasts.',
    price: 10.99,
    imageUrl: getImageUrl('chicken-breast'),
    category: 'chicken'
  },
  {
    id: 'prod_21',
    name: 'Beef Sirloin Steak',
    description: 'A lean yet tender cut, great for grilling or pan-searing.',
    price: 22.50,
    imageUrl: getImageUrl('sirloin-steak'),
    category: 'beef'
  },
  {
    id: 'prod_22',
    name: 'Lamb Shoulder',
    description: 'Perfect for slow-roasting, resulting in tender, pull-apart meat.',
    price: 19.99,
    imageUrl: getImageUrl('lamb-shoulder'),
    category: 'lamb'
  },
  {
    id: 'prod_23',
    name: 'Chicken Thighs',
    description: 'Juicy and flavorful bone-in, skin-on chicken thighs.',
    price: 7.99,
    imageUrl: getImageUrl('chicken-thighs'),
    category: 'chicken'
  },
  {
    id: 'prod_24',
    name: 'Pork Ribs',
    description: 'A full rack of pork ribs, ready for your favorite BBQ sauce.',
    price: 15.75,
    imageUrl: getImageUrl('pork-ribs'),
    category: 'pork'
  },
  {
    id: 'prod_25',
    name: 'Filet Mignon',
    description: 'The most tender cut of beef, exceptionally lean and buttery.',
    price: 35.99,
    imageUrl: getImageUrl('filet-mignon'),
    category: 'beef'
  },
  {
    id: 'prod_26',
    name: 'Ground Lamb',
    description: 'Flavorful ground lamb, perfect for Mediterranean dishes.',
    price: 12.99,
    imageUrl: getImageUrl('ground-lamb'),
    category: 'lamb'
  },
  {
    id: 'prod_27',
    name: 'Beef Shank',
    description: 'Ideal for slow cooking, making rich broths, and Osso Buco.',
    price: 10.50,
    imageUrl: getImageUrl('beef-shank'),
    category: 'beef'
  },
  {
    id: 'prod_28',
    name: 'Special Beef Cut',
    description: 'A premium, hand-selected cut known for its tenderness.',
    price: 28.50,
    imageUrl: getImageUrl('nahatari-meat'),
    category: 'beef',
  },
  {
    id: 'prod_29',
    name: 'Premium Ground Meat',
    description: 'A versatile blend of premium ground meat for your recipes.',
    price: 11.50,
    imageUrl: getImageUrl('ground-beef'),
    category: 'beef',
  },
  {
    id: 'prod_30',
    name: 'Gourmet Steak Platter',
    description: 'An assortment of gourmet steaks for the ultimate meat lover.',
    price: 45.00,
    imageUrl: 'https://i.pinimg.com/736x/98/b7/70/98b77060b988e95d213051eb55f452f8.jpg',
    category: 'beef'
  },
  {
    id: 'prod_31',
    name: 'Assorted Meat Box',
    description: 'A curated box of various meat cuts, perfect for any occasion.',
    price: 55.00,
    imageUrl: 'https://i.pinimg.com/1200x/76/7e/3c/767e3c60507e1955ac2ec0509024fee1.jpg',
    category: 'mixed'
  }
];
