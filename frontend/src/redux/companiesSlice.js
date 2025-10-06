import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCompanies } from "../api/companyApi";

//  Async Thunk
export const fetchCompanies = createAsyncThunk(
  "companies/fetch",
  async (params = {}, thunkAPI) => {
    try {
      // backend returns: { success, total, totalPages, currentPage, companies }
      const data = await getCompanies(params);
      return data; // data already includes full object
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Network error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//  Initial State
const initialState = {
  companies: [],
  total: 0,
  totalPages: 1,
  currentPage: 1,
  loading: false,
  refreshing: false, //  for smooth pagination/filter updates
  error: null,
  lastParams: {},
};

//  Slice
const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state, action) => {
        // If fetching the same filter but next page, use "refreshing"
        const newParams = action.meta.arg || {};
        const isSameFilter =
          state.lastParams.search === newParams.search &&
          state.lastParams.industry === newParams.industry &&
          state.lastParams.location === newParams.location &&
          state.lastParams.size === newParams.size &&
          state.lastParams.minRating === newParams.minRating &&
          state.lastParams.sortBy === newParams.sortBy;

        state.loading = !isSameFilter; // only show full loader if filters changed
        state.refreshing = isSameFilter; // show smooth update for page change
        state.error = null;
        state.lastParams = newParams;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        const payload = action.payload || {};
        state.companies = payload.companies || [];
        state.total = payload.total || 0;
        state.totalPages = payload.totalPages || 1;
        state.currentPage =
          payload.currentPage || state.lastParams.page || 1;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.error = action.payload || "Failed to load companies";
      });
  },
});

export default companiesSlice.reducer;
