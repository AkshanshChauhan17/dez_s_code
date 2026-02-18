export interface Girl {
  id: number;
  name: string;
  age: number;
  city: string;
  price: string;
  image: string;
  description: string;
  services: string[];
  featured: boolean;
  vip: boolean;
  itnl: boolean;
  gallery: string[];
}

export interface Location {
  title: string;
  city: string;
  slug: string;
}