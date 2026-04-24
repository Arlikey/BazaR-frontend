export type OrderItem = {
  id: string;
  number: string;
  status: number;
  statusText: string;
  totalAmount: number;
  currency: string;
  itemsCount: number;
  previewImageUrl: string | null;
  createdAtUtc: string;
  deliveredAtUtc: string | null;
  completedAtUtc: string | null;
};

export type OrdersResponse = {
  items: OrderItem[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export type OrderDetails = {
  id: string;
  number: string;
  status: number;
  statusText: string;
  subtotalAmount: number;
  grandTotalAmount: number;
  currency: string;
  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryMethod: string;
  city: string | null;
  region: string | null;
  warehouse: string | null;
  street: string | null;
  building: string | null;
  apartment: string | null;
  items: OrderLineItem[];
};

export type OrderLineItem = {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  currency: string;
  imageUrl: string | null;
};
