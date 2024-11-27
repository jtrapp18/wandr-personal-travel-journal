// routes.js
import App from "./App";
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2"
import ErrorPage from "./pages/ErrorPage";

const routes = [
  {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
           {
              path: "/",
              element: <Home />
          }, 
          {
              path: "/page-1",
              element: <Page1 />
          },
          {
              path: "/page-2",
              element: <Page2 />,
            //   children: [
            //     {
            //         path: "/project/:id",
            //         element: <ProjectListing />
            //     }
            //   ]
          }
      ]
  }
];

export default routes;