import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
const BASE_URL = 'https://64909f371e6aa71680cb93a4.mockapi.io/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/contacts`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactObj,thunkAPI)  => {
    try {
      const response = await axios.post(`${BASE_URL}/contacts`, contactObj);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
