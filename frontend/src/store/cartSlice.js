// ✅ Import required utilities from Redux Toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Async thunk to fetch cart items from backend
export const fetchCartFromBackend = createAsyncThunk(
  "cart/fetchCartFromBackend",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.user?.user;

    if (!user || !user.id) {
      console.log("❌ User not logged in — skipping fetchCartFromBackend");
      return []; // return empty cart
    }

    console.log(`🔄 Fetching cart from backend for user ID: ${user.id}`);
    const response = await fetch(`http://localhost:3000/cart/${user.id}`);

    if (!response.ok) throw new Error("Failed to fetch cart");

    const data = await response.json();
    return data;
  }
);

// ✅ Async thunk to sync local cart to backend (modified)
export const syncCartToBackend = createAsyncThunk(
  "cart/syncCart",
  async (cartItems, thunkAPI) => {
    const state = thunkAPI.getState(); // 👈 Access full Redux state
    const user = state.user?.user; // 👈 Get logged-in user info

    // 🛑 If user not logged in, skip syncing
    if (!user || !user.id) {
      console.log("❌ User not logged in — skipping cart sync.");
      return;
    }

    console.log("✅ User logged in — syncing cart to backend...");

    try {
      const response = await fetch(`http://localhost:3000/cart/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      if (!response.ok) throw new Error("Failed to sync cart");

      thunkAPI.dispatch(setCartSynced(true));
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ✅ Slice for cart
let cartSlice = createSlice({
  name: "cart",

  // ✅ Initial state
  initialState: {
    cartLoaded: false, // Has the cart been fetched from backend?
    items: [], // Items in the cart
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null, // Holds any error messages
    synced: false, // ✅ Tracks if local cart is synced to backend
  },

  // ✅ Synchronous reducers
  reducers: {
    addToCart: (state, action) => {
      console.log("Inside addToCart reducer");
      const existing = state.items.find((item) => item?.id === action.payload);
      if (existing) {
        existing.quantity += 1; // Increase quantity if item already in cart
      } else {
        state.items.push({ id: action.payload, quantity: 1 }); // Add new item
      }
    },

    removeFromCart: (state, action) => {
      console.log("Inside removeFromCart reducer");
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    reduceQuantityFromCart: (state, action) => {
      console.log("Inside reduceQuantityFromCart reducer");
      const existing = state.items.find((item) => item.id === action.payload);
      if (existing) {
        existing.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.cartLoaded = true; // Prevent refetching empty cart
      console.log("Cart cleared");
    },

    setCart: (state, action) => {
      // Used when loading cart from backend
      state.items = action.payload;
      state.cartLoaded = true;
      console.log("Cart set with items:", action.payload);
    },

    setCartSynced: (state, action) => {
      // Used to mark whether syncing succeeded
      state.synced = action.payload;
    },
  },

  // ✅ Handle async thunks (extraReducers)
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartFromBackend.pending, (state) => {
        state.status = "loading";
        state.error = null;
        console.log("Fetching cart from backend...");
      })
      .addCase(fetchCartFromBackend.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // action.payload = data returned by thunk
        state.cartLoaded = true;
        console.log("Cart fetched from backend:", action.payload);
      })
      .addCase(fetchCartFromBackend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error("Failed to fetch cart:", action.error.message);
      });
  },
});

// ✅ Export individual actions to dispatch in components
export const {
  addToCart,
  removeFromCart,
  clearCart,
  setCart,
  reduceQuantityFromCart,
  setCartSynced,
} = cartSlice.actions;

// ✅ Export the reducer to include in store.js
export default cartSlice.reducer;
