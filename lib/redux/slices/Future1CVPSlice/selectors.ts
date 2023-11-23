import { CVPCards } from '@/app/Interfaces'
import type { ReduxState } from '@/lib/redux'
import { createSelector } from '@reduxjs/toolkit';

const selectCVPData = (state: ReduxState) => state.Future1CVP.data;
const selectCVPLoading = (state: ReduxState) => state.Future1CVP.loading;
const selectCVPError = (state: ReduxState) => state.Future1CVP.error;

export const selectCVP = createSelector(
  selectCVPData,
  selectCVPLoading,
  selectCVPError,
  (data, loading, error) => ({ data, loading, error })
);

export const selectFuture1CVPCardChat = (state: ReduxState) => state?.Future1CVP?.conversation;
export const selectedFuture1CVPCard = (state: ReduxState) => state?.Future1CVP?.data?.find((card: CVPCards) => card?.selected)

