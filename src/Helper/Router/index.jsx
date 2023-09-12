import { authProvider } from "../authProvider";
import LoginPage from "../../Pages/Login";
import SignUpPage from "../../Pages/SignUp";

import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import ProtectedPage from "../../Layout/Protected";
import HomePage from "../../Pages/Home";
import ContainerCenter from "../../Layout/Container/Center";

async function loginLoader() {
  if (authProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

async function loginAction({ request }) {
  let formData = await request.formData();
  let email = formData.get("email");

  if (!email) {
    return {
      error: "You must provide a email to log in",
    };
  }

  try {
    await authProvider.signin(email);
  } catch (error) {
    return {
      error: "Invalid login attempt",
    };
  }

  let redirectTo = formData.get("redirectTo");
  return redirect(redirectTo || "/");
}

function protectedLoader({ request }) {
  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}


const Protected = (children) => {
  return (
    <ProtectedPage>
      {children}
    </ProtectedPage>
  );
}

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      return { user: "marcos" };
    },
    children: [
      {
        index: true,
        loader: protectedLoader,
        Component: () => Protected(<HomePage />),
      },
      {
        path: 'home',
        loader: protectedLoader,
        Component: () => Protected(<HomePage />),
      },
      {
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: () => <ContainerCenter><LoginPage /></ContainerCenter>,
      },
      {
        path: "sign-up",
        Component: SignUpPage,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      await authProvider.signout();
      return redirect("/");
    },
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
