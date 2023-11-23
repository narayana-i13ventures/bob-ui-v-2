
import type { ReduxState } from '@/lib/redux'
import { createSelector } from '@reduxjs/toolkit';

const selectBMCData = (state: ReduxState) => state.Future3BMC.data;
const selectBMCLoading = (state: ReduxState) => state.Future3BMC.loading;
const selectBMCError = (state: ReduxState) => state.Future3BMC.error;

export const selectBMCFuture3 = createSelector(
    selectBMCData,
    selectBMCLoading,
    selectBMCError,
    (data, loading, error) => ({ data, loading, error })
);

export const selectedFuture3BMCCard = (state: ReduxState) => state?.Future3BMC?.data?.find((card: any) => card?.selected)
export const selectFuture3BMCCardChat = (state: ReduxState) => state?.Future3BMC?.conversation;

