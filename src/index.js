import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import "swiper/css/bundle";
// import "swiper/css";
// import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
// import "swiper/swiper.min.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
