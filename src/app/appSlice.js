import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { fetchChartData } from './api';

const initialState = {
  loading: false,
  error: null,
  data: [],
  editModal: false,
  editData: [],
  editId: null,
};

export const thunkChartData = createAsyncThunk('app/fetchChartData', async () => {
  const response = await fetchChartData();
  return response;
});

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setEditModal: (state, action) => {
      const { open, id } = action.payload;
      state.editModal = action.payload.open;
      if (open) {
        state.editId = id;
      } else {
        state.editId = null;
        state.editData = [];
      }
      if (state.data.length && open) {
        const filterData = state.data.filter((chart) => chart.id === id)?.[0];
        state.editData = filterData?.elements;
      }
    },
    manageSave: (state, action) => {
      const { editedData } = action.payload;
      const editId = state.editId;
      const editIndex = state.data.findIndex((d) => d.id === editId);
      state.data[editIndex].elements = editedData;
      state.editId = null;
      state.editData = [];
      state.editModal = false;
    },
  },
  extraReducers: {
    [thunkChartData.pending]: (state) => {
      if (state.loading === false) {
        state.loading = true;
      }
    },
    [thunkChartData.fulfilled]: (state, action) => {
      if (state.loading === true) {
        state.loading = false;
      }
      if (action.payload && Array.isArray(action.payload)) {
        state.data = action.payload.map((data) => ({ ...data, id: nanoid() }));
      }
    },
    [thunkChartData.rejected]: (state) => {
      if (state.loading === true) {
        state.loading = false;
      }
    },
  },
});

export const { setEditModal, manageSave } = appSlice.actions;

export const selectData = (state) => state.app.data;
export const selectLoading = (state) => state.app.loading;

export default appSlice.reducer;
