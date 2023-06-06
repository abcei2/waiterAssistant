export type TableTotalOrderType = {
  tableId: number;
  total: number;
  tips: number;
};

export type CustomerTotalOrderType = {
  itemsCount: number;
  subtotal: number;
  tips: number;
  customerSummary: CustomerOrderType[];
};

export type CustomerOrderType = {
  id: number;
  name: string;
  price: number;
  amount: number;
  subtotal: number;
};

export type ProductsType = {
  id: number;
  name: string;
  srcImg: string;
  price: number;
};
