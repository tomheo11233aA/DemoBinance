import { RootState } from "../store";

export const topTabP2pSelector = (state: RootState) => state.p2p.topTab 

export const bottomP2pSelector = (state: RootState) => state.p2p.bottomTab 

export const tabBuySellP2pSelector = (state: RootState) => state.p2p.tabBuySell