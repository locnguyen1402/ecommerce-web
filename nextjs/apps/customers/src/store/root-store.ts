import LayoutStore from "./layout-store";

class RootStore {
  layoutStore: LayoutStore;

  constructor() {
    this.layoutStore = new LayoutStore();
  }
}

export default RootStore;
