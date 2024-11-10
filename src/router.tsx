import App from "./App";
import { Outlet, createBrowserRouter } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* TODO: Add a header here */}
      <Outlet />
    </div>
  );
};

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
]);

export default Router;
