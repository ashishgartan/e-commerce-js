// ✅ Importing required utilities from Redux Toolkit
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// ✅ redux-persist: Helps persist Redux state to localStorage/sessionStorage
import { persistStore, persistReducer } from "redux-persist";

// ✅ LocalStorage engine (can be replaced with sessionStorage or custom logic)
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// ✅ Importing reducers (state slices)
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";

// ✅ Step 1: Combine all reducers into a single root reducer
// This will shape the Redux state as: { user: ..., cart: ... }
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

// ✅ Step 2: Create redux-persist configuration
const persistConfig = {
  key: "root", // top-level key for storage in localStorage
  storage, // which storage engine to use (localStorage here)

  // 📝 Optional settings:
  // whitelist: ["cart"], // only persist the 'cart' state
  // blacklist: ["user"], // do not persist 'user' state
};

// ✅ Step 3: Create a persisted reducer using redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Step 4: Configure the Redux store
const store = configureStore({
  reducer: persistedReducer, // use the persisted version of the rootReducer

  // 🔧 Disable serializableCheck middleware warning:
  // redux-persist stores metadata that isn't serializable (like Promises),
  // so we turn off strict serializability checks here.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// ✅ Step 5: Create a persistor linked to the store
// This is used by <PersistGate> in React to delay rendering until rehydration
export const persistor = persistStore(store);

// ✅ Step 6: Export the configured store as default
export default store;
