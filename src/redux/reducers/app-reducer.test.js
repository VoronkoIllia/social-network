import AppReducer, { setInitialize } from "./app-reducer";

let state = {
  initialized: false,
};

test("initialize went correct", () => {
  let action = setInitialize();
  let newState = AppReducer(state, action);
  expect(newState.initialized).toBe(true);
});
