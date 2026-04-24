import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import invoiceAPI from "../../../API/invoiceAPI";

// Async thunk to fetch all invoices
export const fetchInvoices = createAsyncThunk(
  "invoices/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await invoiceAPI.getInvoices();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch invoices",
      );
    }
  },
);

// Async thunk to mark invoice as paid
export const markInvoiceAsPaid = createAsyncThunk(
  "invoices/markAsPaid",
  async (invoiceId, { rejectWithValue }) => {
    try {
      const updated = await invoiceAPI.markInvoiceAsPaid(invoiceId);
      return updated;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark invoice as paid",
      );
    }
  },
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    list: [],
    loading: false,
    error: null,
    filter: "all", // 'pending', 'paid', 'all'
    markPaidLoading: false,
    markPaidError: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Mark as paid
      .addCase(markInvoiceAsPaid.pending, (state) => {
        state.markPaidLoading = true;
        state.markPaidError = null;
      })
      .addCase(markInvoiceAsPaid.fulfilled, (state, action) => {
        state.markPaidLoading = false;
        const updated = action.payload.invoice;
        const idx = state.list.findIndex((inv) => inv._id === updated._id);
        if (idx !== -1) {
          state.list[idx] = { ...state.list[idx], ...updated };
        }
      })
      .addCase(markInvoiceAsPaid.rejected, (state, action) => {
        state.markPaidLoading = false;
        state.markPaidError = action.payload;
      });
  },
});

export const { setFilter } = invoiceSlice.actions;
export default invoiceSlice.reducer;
