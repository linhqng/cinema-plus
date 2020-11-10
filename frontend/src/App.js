import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import theme from "./theme/index";
import Routes from "./Routes";
import "typeface-montserrat";
import Alert from "./components/Alert/Alert";
const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Alert></Alert>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
