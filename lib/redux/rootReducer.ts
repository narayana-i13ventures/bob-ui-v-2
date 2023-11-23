import { AppSlice, Future1BMCSlice, Future1CVPSlice, Future2BMCSlice, Future3BMCSlice, companySlice, menuSlice } from './slices'
import { thinkBeyondSlice } from './slices/ThinkBeyondSlice'

export const reducer = {
  company: companySlice.reducer,
  thinkBeyond: thinkBeyondSlice.reducer,
  App: AppSlice.reducer,
  menu: menuSlice.reducer,
  Future1BMC: Future1BMCSlice.reducer,
  Future2BMC: Future2BMCSlice.reducer,
  Future3BMC: Future3BMCSlice.reducer,
  Future1CVP: Future1CVPSlice.reducer
}
