/* Instruments */
import { apiSlice } from './Api'
import { appSlice, thinkBeyondSlice, Future1BMCSlice, notificationSlice, companySlice, Future1CVPSlice } from './slices'
import { Future1EmpathySlice } from './slices/Future1EmpathySlice'

export const reducer = {
  api: apiSlice.reducer,
  App: appSlice.reducer,
  company: companySlice.reducer,
  ThinkBeyond: thinkBeyondSlice.reducer,
  Future1BMC: Future1BMCSlice.reducer,
  notifications: notificationSlice.reducer,
  Future1CVP: Future1CVPSlice.reducer,
  Future1EMpathy:Future1EmpathySlice.reducer
}
