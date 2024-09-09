import { createSlice } from "@reduxjs/toolkit";
import {
  getProfile,
  updateProfileImage,
  updateProfileInfo,
} from "./profileOperations";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from "../../utils/helpers/handlers";

const initialState = {
  user: {
    id: "",
    image: "",
    firstName: "",
    lastName: "",
    emailPreview: "",
    imagePreview: "",
  },
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateImage: (state, { payload }) => {
      state.user.imagePreview = payload;
    },
    updateFullNameAndEmail: (state, { payload }) => {
      state.user = {
        ...state.user,
        ...payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        const { emailPreview, firstName, lastName, imageURL, _id } = payload;

        state.user = {
          id: _id ?? "",
          image: imageURL ?? "",
          firstName: firstName ?? "",
          lastName: lastName ?? "",
          emailPreview: emailPreview ?? "",
        };
      })
      .addCase(updateProfileImage.fulfilled, (state, { payload }) => {
        state.user.image = payload;
      })
      .addCase(updateProfileInfo.fulfilled, (state, { payload }) => {
        const { emailPreview, firstName, lastName } = payload;

        state.user = {
          ...state.user,
          firstName: firstName ?? state.user.firstName,
          lastName: lastName ?? state.user.lastName,
          emailPreview: emailPreview ?? state.user.emailPreview,
        };
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

export const profileReducer = profileSlice.reducer;
export const { updateImage, updateFullNameAndEmail } = profileSlice.actions;
