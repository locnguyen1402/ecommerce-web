import { OrderStatus } from '@vklink/grpc-api';

export const OrderNextAllowedStatuses: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.UNSPECIFIED]: [],
  [OrderStatus.NEW]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]: [OrderStatus.PICKED],
  [OrderStatus.PICKED]: [OrderStatus.PROCESSING],
  [OrderStatus.PROCESSING]: [OrderStatus.QUALITYCHECKDONE],
  [OrderStatus.QUALITYCHECKDONE]: [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]: [OrderStatus.COMPLETED],
  [OrderStatus.COMPLETED]: [],
  [OrderStatus.CANCELLED]: [],
};

export const OrderAllowedPaidStatuses: OrderStatus[] = [
  OrderStatus.CONFIRMED,
  OrderStatus.PICKED,
  OrderStatus.PROCESSING,
  OrderStatus.QUALITYCHECKDONE,
  OrderStatus.DELIVERED,
];

export const OrderAllowedEditableStatuses: OrderStatus[] = [OrderStatus.NEW, OrderStatus.PICKED];

export const OrderTrackingDisplayMapping = [
  {
    title: 'orderSuccess',
    status: OrderStatus.NEW,
  },
  {
    title: 'orderConfirmed',
    status: OrderStatus.CONFIRMED,
  },
  {
    title: 'picked',
    status: OrderStatus.PICKED,
  },
  {
    title: 'processing',
    status: OrderStatus.PROCESSING,
  },
  {
    title: 'quality',
    status: OrderStatus.QUALITYCHECKDONE,
  },
  {
    title: 'delivered',
    status: OrderStatus.DELIVERED,
  },
  {
    title: 'completed',
    status: OrderStatus.COMPLETED,
  },
  {
    title: 'cancelled',
    status: OrderStatus.CANCELLED,
  },
];
