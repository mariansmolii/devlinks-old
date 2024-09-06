export const handleFulfilled = (state) => {
  state.isLoading = false;
  state.error = null;
};

export const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

export const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

export const handleUserData = (state, { payload }) => {
  state.user.email = payload.email;
  state.token = payload.token;
  state.isLoggedIn = true;
};
