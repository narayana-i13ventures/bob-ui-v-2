
import type { ReduxState } from '@/lib/redux'

export const selectCompany = (state: ReduxState) => state.company.company;