import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App.jsx";
import Home from "./routes/Home.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import Profile from "./routes/Profile.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "",
				element: <PrivateRoute />,
				children: [
					{
						path: "/profile",
						element: <Profile />,
					},
				],
			},
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	</Provider>
);
