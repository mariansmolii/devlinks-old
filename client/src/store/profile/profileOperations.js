import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../../services/axiosHeader";
import instance from "../../services/axiosInstance";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    try {
      setAuthHeader(persistedToken);

      const { data } = await instance.get("/api/profile/");

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  "profile/updateProfileImage",
  async (formData, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    try {
      setAuthHeader(persistedToken);

      const { data } = await instance.patch("/api/profile/images", formData);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProfileInfo = createAsyncThunk(
  "profile/updateProfileInfo",
  async (
    { emailPreview, lastName, firstName, id },
    { rejectWithValue, getState }
  ) => {
    const state = getState();
    const persistedToken = state.auth.token;

    const profileData = {
      lastName,
      firstName,
      emailPreview,
    };

    for (const key in profileData) {
      if (profileData[key].trim() === "") {
        delete profileData[key];
      }
    }

    try {
      setAuthHeader(persistedToken);

      const { data } = await instance.patch(`/api/profile/${id}`, profileData);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
