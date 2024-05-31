import { makeAutoObservable } from 'mobx';

export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type Toast = {
  id: string;
  title: string;
  description: string;
  type: ToastType;
};

export class ToastStore {
  items: Array<Toast> = [];

  get hasToastItems(): boolean {
    return !!this.items.length;
  }

  add(item: Toast) {
    this.items.unshift(item);
  }

  remove(itemId: string) {
    this.items = this.items.filter((item) => item.id !== itemId);
  }

  constructor() {
    makeAutoObservable(this);
  }
}
