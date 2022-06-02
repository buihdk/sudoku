import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { devToolsEnhancer } from 'redux-devtools-extension'

import reducer from 'reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const configureStore = (
  initialState = { incorrectCount: 0, completed: false }
) => {
  const store = createStore(persistedReducer, devToolsEnhancer({}))
  const persistor = persistStore(store)
  return { persistor, store }
}

export default configureStore
