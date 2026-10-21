import { createBrowserRouter } from "react-router";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import Layout from "./component/layout";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./component/protectedRoute";
const router = createBrowserRouter([
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
