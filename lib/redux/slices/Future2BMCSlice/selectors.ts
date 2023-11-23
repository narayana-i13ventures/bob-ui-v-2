
import type { ReduxState } from '@/lib/redux'
import { createSelector } from '@reduxjs/toolkit';

const selectBMCData = (state: ReduxState) => state.Future2BMC.data;
const selectBMCLoading = (state: ReduxState) => state.Future2BMC.loading;
const selectBMCError = (state: ReduxState) => state.Future2BMC.error;

export const selectBMCFuture2 = createSelector(
    selectBMCData,
    selectBMCLoading,
    selectBMCError,
    (data, loading, error) => ({ data, loading, error })
);

export const selectedFuture2BMCCard = (state: ReduxState) => state?.Future2BMC?.data?.find((card: any) => card?.selected)
export const selectFuture2BMCCardChat = (state: ReduxState) => state?.Future2BMC?.conversation;

