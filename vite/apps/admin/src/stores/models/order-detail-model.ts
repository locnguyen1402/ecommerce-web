import { makeAutoObservable } from 'mobx';

import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  OrderResponse,
  PlainMessage,
} from '@vklink/grpc-api';

/**
 * Use to watch order detail
 * Need to add more fields in OrderResponse if necessary
 */
export class OrderDetailModel {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalPrice: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  constructor(order: PlainMessage<OrderResponse>) {
    makeAutoObservable(this);

    this.id = order.id;
    this.orderNumber = order.orderNumber;
    this.status = order.status;
    this.totalPrice = order.totalPrice;
    this.paymentMethod = order.paymentMethod;
    this.paymentStatus = order.paymentStatus;
  }
}
