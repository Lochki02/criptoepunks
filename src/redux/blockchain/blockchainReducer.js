const initialState = {
    loading: false,
    account: null,
    errorMsg: "",
  };
  
  const blockchainReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CONNECTION_REQUEST":
        return {
          ...initialState,
          loading: true,
        };
      case "CONNECTION_SUCCESS":
        return {
          ...state,
          loading: false,
          account: action.payload
        };
      case "CONNECTION_FAILED":
        return {
          ...initialState,
          loading: false,
          errorMsg: action.payload,
        };
      case "UPDATE_ACCOUNT":
        return {
          ...state,
          account: action.payload
        };
      case "DISCONNECT":
        return initialState
      default:
        return state;
    }
  };
  
  export default blockchainReducer;