import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface IRegisterFormState {
  name: string;
  email: string;
  password: string;
  gender: "male" | "female" | null;
  birthDay: string | null;
  bio: string;
  image?: string;
}

type IRegisterFromStatePartOne = Pick<
  IRegisterFormState,
  "name" | "email" | "password"
>;

type IRegisterFromStatePartTwo = Pick<
  IRegisterFormState,
  "gender" | "bio" | "image"
> & { birthDay: string };
// Define the initial state using that type
const initialState: IRegisterFormState = {
  name: "",
  email: "",
  password: "",
  gender: null,
  birthDay: null,
  bio: "",
  image: "",
};

export const registerFormSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleFirstPart(
      state: IRegisterFormState,
      action: PayloadAction<IRegisterFromStatePartOne>
    ) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    handleSecondPart(
      state: IRegisterFormState,
      action: PayloadAction<IRegisterFromStatePartTwo>
    ) {
      state.gender = action.payload.gender;
      state.birthDay = action.payload.birthDay;
      state.bio = action.payload.bio;
      state.image = action.payload.image;
    },

    handleClear(state: IRegisterFormState) {
      state.name = "";
      state.email = "";
      state.password = "";
      state.gender = null;
      state.birthDay = null;
      state.bio = "";
      state.image = "";
    },
  },
});

export const { handleFirstPart, handleSecondPart, handleClear } =
  registerFormSlice.actions;

export default registerFormSlice.reducer;
