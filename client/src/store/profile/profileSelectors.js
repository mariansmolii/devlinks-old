export const selectImage = (state) => state.profile.user.image;

export const selectFirstName = (state) => state.profile.user.firstName;

export const selectLastName = (state) => state.profile.user.lastName;

export const selectEmailPreview = (state) => state.profile.user.emailPreview;

export const selectProfileError = (state) => state.profile.error;

export const selectProfileIsLoading = (state) => state.profile.isLoading;

export const selectImagePreview = (state) => state.profile.user.imagePreview;
