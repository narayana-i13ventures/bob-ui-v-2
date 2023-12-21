import type { ReduxState } from "@/lib/redux";

export const selectedFuture1CVP = (state: ReduxState) =>
    state?.Future1CVP?.selectedCard;

export const selectFuture1CVPCompleted = (state: ReduxState) => state?.Future1CVP?.canvasCompleted;