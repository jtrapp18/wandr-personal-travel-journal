// routes.js
import App from "./App";
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2"
import ErrorPage from "./pages/ErrorPage";
import TripReview from "./pages/TripReview";
import TripItinerary from "./pages/TripItinerary";

const routes = [
  {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
           {
              path: "/",
              element: <Home />,
              children: [
                {
                    path: "/review/:id",
                    element: <TripReview />
                },
                {
                  path: "/itinerary/:id",
                  element: <TripItinerary />
                }
              ]
          }, 
          {
              path: "/page-1",
              element: <Page1 />
              // children: [
              //   {
              //       path: "/review/:id",
              //       element: <TripReview />
              //   }
              // ]
          },
          {
              path: "/page-2",
              element: <Page2 />
              // children: [
              //   {
              //       path: "/itinerary/:id",
              //       element: <TripItinerary />
              //   }
              // ]
          }
      ]
  }
];

export default routes;