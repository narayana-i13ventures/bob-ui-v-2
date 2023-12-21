import type { ReduxState } from "@/lib/redux";

export const selectedFuture1BMC = (state: ReduxState) =>
    state?.Future1BMC?.selectedCard;


export const selectCVPPrefillBody = (state: ReduxState) => state?.Future1BMC?.CVPPrefillBody;
export const selectFuture1BMCCompleted = (state: ReduxState) => state?.Future1BMC?.canvasCompleted;
export const selectFuture1BMCCanvasColors = (state :ReduxState) => state?.Future1BMC?.canvasColors;