export class Category {
  constructor(public id: number,
              public name: string,
              public hasSubCategory: boolean,
              public parentId: number) { }
}

export class Product {
  constructor(public id: number,
              public name: string,
              public images: Array<any>,
              public oldPrice: number,
              public newPrice: number,
              public discount: number,
              public ratingsCount: number,
              public ratingsValue: number,
              public description: string,
              public shortdescription: string,
              public extra_description: string,
              public availibilityCount: number,
              public color: Array<string>,
              public size: Array<string>,
              public weight: number,
              public categoryId: number,
              public category_name: string,
              public attributes: Array<any>,
              public quantity: number = 1) { }
}

export interface Products {
  products: Product[];
  limit: number;
  page: number;
  total: number;
  total_pages: number;
}

export interface Error {
  message: string;
}
