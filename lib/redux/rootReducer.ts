/* Instruments */
import { apiSlice } from './Api'
import { ProjectApiSlice } from './projectApi'
import { appSlice, thinkBeyondSlice, Future1BMCSlice, notificationSlice, companySlice, Future1CVPSlice } from './slices'
import { Future1EmpathySlice } from './slices/Future1EmpathySlice'

export const reducer = {
  api: apiSlice.reducer,
  ProjectApi:ProjectApiSlice.reducer,
  App: appSlice.reducer,
  company: companySlice.reducer,
  ThinkBeyond: thinkBeyondSlice.reducer,
  Future1BMC: Future1BMCSlice.reducer,
  notifications: notificationSlice.reducer,
  Future1CVP: Future1CVPSlice.reducer,
  Future1EMpathy:Future1EmpathySlice.reducer
}
