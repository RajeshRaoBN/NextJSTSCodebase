// DUCKS pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
};

const initialState: CounterState = {
    value: 10
};

const counterSlice = createSlice({
    name: 'Counter',
    initialState,
    reducers: {
        // increment
        incremented(state) {
            // It's okay to do this because immer 
            // makes it immutable under the hood
            state.value++
        },
        amountAdded(state, action: PayloadAction<number>) {
            state.value += action.payload;
        },
        // decrement

        // reset

    }
});

export const { incremented, amountAdded } = counterSlice.actions;
export default counterSlice.reducer;