import { createSlice } from "@reduxjs/toolkit";
import {
  createLink,
  deleteLink,
  getAllLinks,
  updateLinks,
} from "./linksOperations";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from "../../utils/helpers/handlers";

const initialState = {
  links: [],
  isLoading: false,
  error: null,
  isLinksInDB: false,
};

const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    addLink: (state, { payload }) => {
      state.links.push(payload);
    },
    deleteLinkLocally: (state, { payload }) => {
      state.links = state.links.filter((link) => link._id !== payload);

      const updateLinksIndex = state.links.map((link, index) => {
        return { ...link, index };
      });

      state.links = updateLinksIndex;
    },
    getLinkData: (state, { payload }) => {
      const { _id, platform, url } = payload;

      state.links = state.links.map((link) => {
        if (link._id === _id) {
          return {
            ...link,
            platform: platform || link.platform,
            url: url !== undefined ? url : link.url,
          };
        }
        return link;
      });
    },
    updateLinkIndex: (state, { payload }) => {
      const { _id, index } = payload;
      const link = state.links.find((link) => link._id === _id);
      if (link) {
        link.index = index;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLinks.fulfilled, (state, { payload }) => {
        state.links = payload;
        if (payload.length > 0) {
          state.isLinksInDB = true;
        }
      })
      .addCase(createLink.fulfilled, (state, { payload }) => {
        state.links = state.links.map((link) => {
          const newLink = payload.find(
            (newLink) => newLink.index === link.index
          );
          if (newLink) {
            return newLink;
          }
          return link;
        });
      })
      .addCase(updateLinks.fulfilled, (state, { payload }) => {
        state.links = payload;
      })
      .addCase(deleteLink.fulfilled, (state, { payload }) => {
        state.links = state.links.filter((link) => link._id !== payload._id);
      })
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        handleFulfilled
      )
      .addMatcher((action) => action.type.endsWith("/pending"), handlePending)
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        handleRejected
      );
  },
});

export const linksReducer = linksSlice.reducer;
export const { addLink, deleteLinkLocally, getLinkData, updateLinkIndex } =
  linksSlice.actions;
