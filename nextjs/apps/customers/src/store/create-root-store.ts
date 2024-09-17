import { reaction } from "mobx";

import RootStore from "./root-store";

const createRootStore = (): RootStore => new RootStore();

export default createRootStore;
