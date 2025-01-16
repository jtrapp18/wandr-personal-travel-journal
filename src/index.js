import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from './context/users';
import routes from "./routes.js";
import "semantic-ui-css/semantic.min.css";
import './index.css';
import reportWebVitals from './reportWebVitals';
import "./helper.js"
import { WindowWidthProvider } from './context/windowSize';

const router = createHashRouter(routes, {
    basename: "/", // Add this line
    // basename: process.env.NODE_ENV === 'production' ? '/wandr-personal-travel-journal/' : '/',
  });

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <WindowWidthProvider>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </WindowWidthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
