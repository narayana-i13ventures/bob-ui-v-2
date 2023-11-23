import type { ReduxState } from '@/lib/redux'
import { createSelector } from '@reduxjs/toolkit';

const selectThinkBeyondData = (state: ReduxState) => state.thinkBeyond.data;
const selectThinkBeyondLoading = (state: ReduxState) => state.thinkBeyond.loading;
const selectThinkBeyondError = (state: ReduxState) => state.thinkBeyond.error;

export const selectThinkBeyond = createSelector(
    selectThinkBeyondData,
    selectThinkBeyondLoading,
    selectThinkBeyondError,
    (data, loading, error) => ({ data, loading, error })
);
export const selectCardLoading = (state: ReduxState) => state.thinkBeyond.cardLoading;
export const selectedThinkBeyondCard = (state: ReduxState) => state?.thinkBeyond?.data?.find((card: any) => card?.selected)
