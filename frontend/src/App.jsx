import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./pages/First";
import Home from "./pages/Home";
import AddProduct from "./admin/AddProduct";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/product/add",
        element: <AddProduct />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
