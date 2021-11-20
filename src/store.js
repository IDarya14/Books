import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './reducers/rootReducer';

export default () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  return store;
};
