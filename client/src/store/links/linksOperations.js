import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../../services/axiosHeader";

import instance from "../../services/axiosInstance";
import filterLinkFields from "../../utils/helpers/filterLinkFields";

export const getAllLinks = createAsyncThunk(
  "links/getAllLinks",
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    try {
      setAuthHeader(persistedToken);

      const { data } = await instance.get("/api/links/");

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createLink = createAsyncThunk(
  "links/createLink",
  async (links, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    try {
      setAuthHeader(persistedToken);

      const res = await Promise.all(
        links
          .filter((link) => link.type === "new")
          .map((link) => {
            const filteredLink = filterLinkFields(link);
            return instance.post("/api/links/", filteredLink);
          })
      );

      return res.map((response) => response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateLinks = createAsyncThunk(
  "links/updateLinks",
  async (links, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    try {
      setAuthHeader(persistedToken);

      const { data } = await instance.patch("/api/links/", {
        links,
      });

      return data.links.map((link) => link);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteLink = createAsyncThunk(
  "links/deleteLink",
  async ({ _id }, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    try {
      setAuthHeader(persistedToken);

      const { data } = await instance.delete(`/api/links/${_id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
