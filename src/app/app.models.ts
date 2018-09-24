export interface Category {
  id: number;
  name: string;
  hasSubCategory: boolean;
  parentId: number;
  permalink: string;
  crumbPath: any;
}

export class Product {
  id: number;
  name: string;
  images: Array<any>;
  oldPrice: number;
  newPrice: number;
  discount: number;
  ratingsCount: number;
  ratingsValue: number;
  description: string;
  shortdescription: string;
  extra_description: string;
  availibilityCount: number;
  color: Array<string>;
  size: Array<string>;
  weight: number;
  categoryId: number;
  category_name: string;
  attributes: Array<any>;
  quantity: number;
  reviews: string;
  expertReview: any;
  permalink: string;
  crumbPath: any;
  specialLabel: string;
  featureHighlights: string;
  stockIndicator: string;
  stockInfo: string;
  demoUnitText: string;
}

export interface Brand {
  id: number;
  name: string;
  image: string;
  description: string;
  shortdescription: string;
  footer_description: string;
}

export interface Response {
  limit: number;
  page: number;
  total: number;
  total_pages: number;
}

export interface Brands extends Response {
  manufacturer: Brand[];
}

export interface Products extends Response {
  products: Product[];
}


export interface Error {
  message: string;
}
