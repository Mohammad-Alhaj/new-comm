import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "react-cookies";
import { toast } from 'react-toastify'; 

const url ="https://todoappmohammadalhaj.herokuapp.com/api/v2" ;

// get data form API
export const getData = createAsyncThunk(
  "shirts/getData",
  async (arg, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      let response = await axios.get(`${url}/myStore`, {
        headers: {
          authorization: `Bearer ${cookie.load("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// get dataBYid form API
export const getDataById = createAsyncThunk(
  "shirts/getDataById",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const req = await axios.get(
        `${url}/myStore/${id}`,
       
        {
          headers: {
            authorization: `Bearer ${cookie.load("token")}`,
          },
        }
      );
      return req.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Post card
export const postData = createAsyncThunk(
  "shirts/postData",
  async (arg, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const req = await axios.post(`${url}/myStore`, arg , {
        headers: {
          authorization: `Bearer ${cookie.load("token")}`,
        },
      });
      return req.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// update card
export const updateData = createAsyncThunk(
  "shirts/updateData",
  async (data, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    try {
      const req = await axios.put(`${url}/myStore/${data.id}`, data, {
        headers: {
          authorization: `Bearer ${cookie.load("token")}`,
        },
      });

      dispatch(getData());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Delete card
export const deleteCard = createAsyncThunk(
  "shirts/deleteCard",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.delete(`${url}/myStore/${id}`, {
        headers: {
          authorization: `Bearer ${cookie.load("token")}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const shirt = createSlice({
  name: "shirts",
  initialState: { allShirt: [], isLoading: false, error: null, oneShirt: [] },
  extraReducers: {
    // get data
    [getData.fulfilled]: (state, action) => {
      state.allShirt = action.payload;
      state.isLoading = false;
      state.oneShirt = [];
      state.error = null
    },
    [getData.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null
    },
    [getData.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.allShirt = []
    },
    // get data by id
    [getDataById.fulfilled]: (state, action) => {
      state.oneShirt = action.payload;
      state.isLoading = false;
    },
    [getDataById.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getDataById.rejected]: (state, action) => {
      state.error = action.payload;
    },

    //.......post..........................
    [postData.fulfilled]: (state, action) => {
      state.allShirt.push(action.payload);
      state.isLoading = false;
      toast.success(`Added ${action.payload.name} successfully`)
    },
    [postData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [postData.rejected]: (state, action) => {
      state.error = action.payload;
    },
    // update ............
    [updateData.fulfilled]: (state, action) => {
      // console.log(action.payload)
      // state.allShirt.filter(ele=>
      //     ele.id!==action.payload.id
      //     )
      //     state.allShirt.push(action.payload)
      state.isLoading = false;
      toast.success(`Update successfully`)
    },
    [updateData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateData.rejected]: (state, action) => {
      state.error = action.payload;
    },
    //Delete card....
    [deleteCard.fulfilled]: (state, action) => {
      state.allShirt = state.allShirt.filter(
        (ele) => ele.id !== action.payload
      );

      state.isLoading = false;
      toast.success(`Delete successfully`)
    },
    [deleteCard.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteCard.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default shirt.reducer;
