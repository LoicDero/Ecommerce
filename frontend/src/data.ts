import { Shoes } from "./app/shared/models/shoes";
import { Tag } from "./app/shared/models/Tag";

export const sample_shoes: Shoes[] = [
  {
    id:'1',
    name: 'Nike Air Jordan 4 Retro SB Pine Green',
    price: 400,
    favorite: true,
    tags: ['street', 'Haute', 'Jordan', 'Nike', 'white'],
    stars: 3.0,
    imageUrl: 'assets/shoes-1.jpg',
    brand : 'Nike Air Jordan',
    size : 44
  },
  {
    id:'2',
    name: 'Nike Duck Low Red',
    price: 200,
    favorite: true,
    tags: ['street', 'Basse', 'Nike', 'Dunk','white'],
    stars: 2.0,
    imageUrl: 'assets/shoes-2.jpg',
    brand : 'Nike',
    size : 44
  },
  {
    id:'3',
    name: 'New Balance 9060 Black White',
    price: 230,
    favorite: false,
    tags: ['street', 'Basse', 'New Balance', 'Noir'],
    stars: 3.5,
    imageUrl: 'assets/shoes-3.jpg',
    brand : 'New Balance',
    size : 44
  },
  {
    id:'4',
    name: 'Yeezy Boost 350 V2 Core Black Red',
    price: 320,
    favorite: true,
    tags: ['street', 'Basse', 'Yeezy', 'Noir'],
    stars: 4.5,
    imageUrl: 'assets/shoes-4.jpg',
    brand : 'Yeezy',
    size : 44
  },
  {
    id:'5',
    name: 'Yeezy 700 V3 Dark Glow',
    price: 375,
    favorite: false,
    tags: ['street', 'Basse', 'Yeezy', 'Noir'],
    stars: 4.0,
    imageUrl: 'assets/shoes-5.jpg',
    brand : 'Yeezy',
    size : 44
  },
  {
    id:'6',
    name: 'Nike Air Jordan 4 Midnight Navy',
    price: 260,
    favorite: false,
    tags: ['street', 'Haute', 'Jordan', 'Nike'],
    stars: 3.0,
    imageUrl: 'assets/shoes-6.jpg',
    brand : 'Nike Air Jordan',
    size : 44
  },
  {
    id:'7',
    name: 'Yeezy cloud white',
    price: 460,
    favorite: true,
    tags: ['street', 'Basse', 'Yeezy', 'white'],
    stars: 5.0,
    imageUrl: 'assets/shoes-7.jpg',
    brand : 'Yeezy',
    size : 44
  },
]

export const sample_tags: Tag[]=[
  {name: 'All', count: 6 },
  {name: 'Nike', count: 3 },
  {name: 'Yeezy', count: 3 },
  {name: 'Jordan', count: 2 },
  {name: 'New Balance', count: 1 },
  {name: 'Basse', count: 4 },
  {name: 'Haute', count: 2 },
  {name: 'Noir', count: 3 },
  {name: 'white', count: 3}
]
