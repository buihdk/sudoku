import { createStore, PreloadedState } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { devToolsEnhancer } from 'redux-devtools-extension'

import reducer from 'reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

type StoreState = ReturnType<typeof persistedReducer>

const configureStore = (initialState?: PreloadedState<StoreState>) => {
  const store = createStore(persistedReducer, initialState, devToolsEnhancer({}))
  const persistor = persistStore(store)
  return { persistor, store }
}

export default configureStore
