/* Core */
import { createLogger } from 'redux-logger'
import { apiSlice } from './Api'
import { ProjectApiSlice } from './projectApi';

const middleware: any[] = [
  // createLogger({
  // duration: true,
  // timestamp: false,
  // collapsed: true,
  // colors: {
  //   title: () => '#139BFE',
  //   prevState: () => '#1C5FAF',
  //   action: () => '#149945',
  //   nextState: () => '#A47104',
  //   error: () => '#ff0005',
  // },
  // predicate: () => typeof window !== 'undefined',
  // }),
]

const allMiddleware = [apiSlice.middleware, ProjectApiSlice.middleware, ...middleware];

export { allMiddleware };
