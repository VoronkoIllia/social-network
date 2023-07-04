export const SET_GLOBAL_ERROR = "web-app/app/SET_GLOBAL_ERROR";

export type SetGlobalError = {
  type: typeof SET_GLOBAL_ERROR
  error: Object | null
}
export const setGlobalError = (error = null):SetGlobalError => ({
  type: SET_GLOBAL_ERROR,
  error,
});