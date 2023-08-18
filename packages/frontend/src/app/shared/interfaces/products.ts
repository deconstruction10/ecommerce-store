export interface Products {
  brands: Brand[];
  series: Series[];
  filters: Partial<Series>;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Series {
  id: number;
  seriesName: string;
  brandName: string;
  brandId: number;
  price: number;
  screenDiagonal: number;
  ram: number;
  builtInMemory: number;
  batteryCapacity: number;
  mainCamera: string;
  mainCameraFeatures: string;
  frontCamera: string;
  processorName: string;
  operatingSystem: string;
  security: string;
  simCards: number;
  countryProducer: string;
  quantity: number;
  productStatus: string;
  minPrice: number;
  maxPrice: number;
}

export interface ApiResponse {
  data: Series[];
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
