import { CHAIN_ID, HEX_CHAIN_ID } from "../contractInfo/contract";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

export const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

export const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const disconnect = () => {
  return {
    type: "DISCONNECT",
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        checkNetwork()

        dispatch(
          connectSuccess(accounts[0])
        );

        ethereum.on("accountsChanged", (accounts) => {
          dispatch(updateAccount(accounts[0]));
        });
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const checkNetwork = async () => {
  const { ethereum } = window;

  const network = await ethereum.request({
    method: "net_version",
  });

  if (network !== CHAIN_ID) {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: HEX_CHAIN_ID }],
    });
  }
}

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest(account));
  };
};