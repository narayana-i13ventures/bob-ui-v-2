
import type { ReduxState } from '@/lib/redux'

export const selectCompany = (state: ReduxState) => state.company.company;
export const selectOnBoardingLoading = (state: ReduxState) => state.company.loading;
