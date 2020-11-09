import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Loading from "./components/Loading/Loading";
import PublicLayout from "./layouts/PublicLayout/PublicLayout";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";

import ProtectedRoute from "./routers/ProtectedRoute";
import WithLayoutRoute from "./routers/WithLayoutRoute";
import AuthRoute from "./routers/AuthRoute";

const Login = lazy(() => import("./page/Public/Login/Login"));
const Register = lazy(() => import("./page/Public/Register/Register"));
const HomePage = lazy(() => import("./page/Public/HomePage/HomePage"));

const DashboardPage = lazy(() => import("./page/Admin/Dashboard/Dashboard"));
const MovieList = lazy(() => import("./page/Admin/MovieList/MovieList"));
const CinemaList = lazy(() => import("./page/Admin/CinemaList/CinemaList"));
const ShowtimeList = lazy(() =>
  import("./page/Admin/ShowtimeList/ShowtimeList")
);
const UserList = lazy(() => import("./page/Admin/UserList/UserList"));
const Account = lazy(() => import("./page/Admin/Account/Account"));
const Promotion = lazy(() =>
  import("./page/Admin/PromotionList/PromotionList")
);

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />

          <ProtectedRoute
            exact
            path="/admin/dashboard"
            layout={AdminLayout}
            component={DashboardPage}
          />
          <ProtectedRoute
            exact
            path="/admin/movies"
            layout={AdminLayout}
            component={MovieList}
          />
          <WithLayoutRoute
            exact
            path="/"
            layout={PublicLayout}
            component={HomePage}
          />
          <ProtectedRoute
            exact
            path="/admin/cinemas"
            layout={AdminLayout}
            component={CinemaList}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/admin/showtimes"
            layout={AdminLayout}
            component={ShowtimeList}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/admin/users"
            layout={AdminLayout}
            component={UserList}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/admin/account"
            layout={AdminLayout}
            component={Account}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/admin/promotions"
            layout={AdminLayout}
            component={Promotion}
          ></ProtectedRoute>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
