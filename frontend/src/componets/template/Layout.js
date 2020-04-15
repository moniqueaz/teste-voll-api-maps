import React from "react";
import { Provider } from "react-redux";
import store from "../../store";
import Page from "../pages/SearchMap";

const Layout = () => {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  );
};

export default Layout;
