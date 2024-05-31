import { makeAutoObservable } from 'mobx';

import { OrderResponse, OrderStatus, PaymentStatus } from '@vklink/grpc-api';

import { OrderDetailModel } from './models';

export class OrderStore {
  detail: OrderDetailModel | null = null;
  isDetailStatusChanging: boolean = false;

  startChangingDetailStatus() {
    this.isDetailStatusChanging = true;
  }

  endChangingDetailStatus() {
    this.isDetailStatusChanging = false;
  }

  updateDetailStatus(newStatus: OrderStatus) {
    this.detail!.status = newStatus;
    if (newStatus === OrderStatus.DELIVERED) {
      this.detail!.paymentStatus = PaymentStatus.PAID;
    }
  }

  confirmDetailPaid() {
    this.detail!.paymentStatus = PaymentStatus.PAID;
  }

  initializeDetail(detail: OrderResponse) {
    this.detail = new OrderDetailModel(detail);
  }

  removeDetail() {
    this.detail = null;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
