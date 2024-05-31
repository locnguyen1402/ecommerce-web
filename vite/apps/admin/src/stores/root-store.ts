import { OrderStore } from './order-store';
import { ToastStore } from './toast-store';

export class RootStore {
  toastStore: ToastStore;
  orderStore: OrderStore;

  constructor() {
    this.toastStore = new ToastStore();
    this.orderStore = new OrderStore();
  }
}
