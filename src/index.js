import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import ProductsProvider from './context/products-context';
import './index.css';
import App from './App';
import productReducer from './store/reducers/products';
import configureStore from './hook-store/products-store';

const rootReducer = combineReducers({
  shop: productReducer
});

const store = createStore(rootReducer);

// configure the custom store
configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <ProductsProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </ProductsProvider>
);
