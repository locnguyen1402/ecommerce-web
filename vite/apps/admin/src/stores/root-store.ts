import { ToastStore } from './toast-store';

export class RootStore {
  toastStore: ToastStore;

  constructor() {
    this.toastStore = new ToastStore();
  }
}
