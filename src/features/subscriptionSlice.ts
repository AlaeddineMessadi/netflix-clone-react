import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";

interface SubscriptionState {
  role: string;
  current_period_start: number;
  current_period_end: number;
}

const initialState: SubscriptionState = {
  role: "",
  current_period_start: 0,
  current_period_end: 0,
};

export const userSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscription: (state, action: PayloadAction<SubscriptionState>) => {
      state = action.payload;
    },
    removeSubscription: (state) => {
      state = initialState;
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { setSubscription, removeSubscription } = userSlice.actions;

// export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selecSubscription = (state: RootState) => state;

export default userSlice.reducer;
