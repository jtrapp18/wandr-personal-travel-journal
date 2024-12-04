// routes.js
import App from "./App";
import Home from "./pages/Home";
import NewTrip from "./pages/NewTrip";
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
      },
      {
        path: "new-trip",
        element: <NewTrip />,
      },
      {
        path: "review/:id", // Top-level route for TripReview
        element: <TripReview />,
      },
      {
        path: "itinerary/:id", // Top-level route for TripItinerary
        element: <TripItinerary />,
      },
    ],
  },
];

export default routes;
