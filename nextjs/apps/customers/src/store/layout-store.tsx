import { makeAutoObservable } from "mobx";

class LayoutStore {
  isSideBarOpen = false;

  openSideBar() {
    this.isSideBarOpen = true;
  }

  closeSideBar() {
    this.isSideBarOpen = false;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default LayoutStore;
