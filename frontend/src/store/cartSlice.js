import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Async thunk to fetch cart from backend
export const fetchCartFromBackend = createAsyncThunk(
  "cart/fetchCartFromBackend",
  async () => {
    const response = await fetch("http://localhost:3000/cart/3"); // Change URL as needed
    if (!response.ok) throw new Error("Failed to fetch cart");
    const data = await response.json();
    console.log(data);
    return data; // The cart items array
  }
);
// Thunk to update backend
export const syncCartToBackend = createAsyncThunk(
  "cart/syncCart",
  async (cartItems, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/cart/1", {
        method: "POST", // or PUT/PATCH depending on your backend logic
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems }),
      });
      if (!response.ok) throw new Error("Failed to sync cart");
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
let cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], status: "idle", error: null },
  reducers: {
    addToCart: (state, action) => {
      console.log("insde scar slice");
      let existing = state.items.find((item) => item.id === action.payload);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ id: action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    setCart: (state, action) => {
      state.items = action.payload; // whole cart from backend
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartFromBackend.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCartFromBackend.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCartFromBackend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { addToCart, removeFromCart, clearCart, setCart } =
  cartSlice.actions;

export default cartSlice.reducer;
