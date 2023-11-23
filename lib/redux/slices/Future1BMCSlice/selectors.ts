
import type { ReduxState } from '@/lib/redux'
import { createSelector } from '@reduxjs/toolkit';

const selectBMCData = (state: ReduxState) => state.Future1BMC.data;
const selectBMCLoading = (state: ReduxState) => state.Future1BMC.loading;
const selectBMCError = (state: ReduxState) => state.Future1BMC.error;

export const selectBMCFuture1 = createSelector(
    selectBMCData,
    selectBMCLoading,
    selectBMCError,
    (data, loading, error) => ({ data, loading, error })
);

export const selectedFuture1BMCCard = (state: ReduxState) => state?.Future1BMC?.data?.find((card: any) => card?.selected)
export const selectFuture1BMCCardChat = (state: ReduxState) => state?.Future1BMC?.conversation;

