import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

export interface RootState {
  router: History;
}

const rootReducer = (_history: History) =>
  combineReducers({
    router: connectRouter(_history),
  });

export default rootReducer;
