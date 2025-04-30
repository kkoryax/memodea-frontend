import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home";
import NavigatorTab from "./components/NavigatorTab";
import Register from "./pages/Register";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigatorTab/>,
    errorElement: (
      <div className="min-w-screen min-h-screen">
        <h1>404 not found</h1>
      </div>
    ),
    children: [
      {path: "/", element: <Home/>},
      {path: "register", element: <Register/>},
      {path: "login", element: <Login/>}
    ]
  }
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}