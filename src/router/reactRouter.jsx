import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { StoreProvider } from "@/context/store";
import { isEqualPath } from "@/context/utils";
import "@/assets/scss/App.scss";

// Homepages
import HomePage from "@/views/react/homes/HomePage";
import HomeFrontOffice from "@/views/react/homes/HomeFrontOffice";
import HomeComunita from "@/views/react/homes/HomeComunita";

//Comunita
import CercoPartner from "@/views/react/comunita/CercoPartner";
import EccoloQua from "@/views/react/comunita/EccoloQua";
import Aiutatemi from "@/views/react/comunita/Aiutatemi";
import Leaderboard from "@/views/react/comunita/Leaderboard";

// Ecommerce
import HomeScreen from "@/views/react/ecommerce/HomeScreen";
import CartScreen from "@/views/react/ecommerce/CartScreen";
import ShippingAddressScreen from "@/views/react/ecommerce/ShippingAddressScreen";
import PlaceOrderScreen from "@/views/react/ecommerce/PlaceOrderScreen";
import ProductScreen from "@/views/react/ecommerce/ProductScreen";
import OrderScreen from "@/views/react/ecommerce/OrderScreen";
import OrderHistoryScreen from "@/views/react/ecommerce/OrderHistoryScreen";
import PaymentMethodScreen from "@/views/react/ecommerce/PaymentMethodScreen";
import HomeServiceFaceToFace from "@/views/react/services/HomeServiceFaceToFace";
import HomeServiceOnline from "@/views/react/services/HomeServiceOnline";
import ServiceScreen from "@/views/react/services/ServiceScreen";

// Login
import Login from "@/views/react/User/Login";
import Register from "@/views/react/User/Register";
import Profile from "@/views/react/User/Profile";
import Navbar from "@/components/react/navbar/Navbar";
import AddPet from "@/views/react/User/AddPet";
import Footer from "@/components/react/footer/Footer";

const ReactRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/profile", element: <Profile /> },
  { path: "/office", element: <HomeFrontOffice /> },
  { path: "/backoffice/login", element: <Login /> },
  { path: "/backoffice/register", element: <Register /> },
  { path: "/add_pet", element: <AddPet /> },
  {
    path: "/comunita",
    element: <HomeComunita />,
    children: [
      { path: "/comunita", element: <HomeComunita /> },
      { path: "/comunita/cerco-partner", element: <CercoPartner /> },
      { path: "/comunita/eccolo-qua", element: <EccoloQua /> },
      { path: "/comunita/aiutatemi", element: <Aiutatemi /> },
      { path: "/comunita/leaderboard", element: <Leaderboard /> },
    ],
  },
  {
    path: "/services/facetoface",
    element: <HomeServiceFaceToFace />,
  },
  {
    path: "/services/online",
    element: <HomeServiceOnline />,
  },
  { path: "/services/:serviceType/:slug", element: <ServiceScreen /> },
  {
    path: "/shop",
    element: <HomeScreen />,
    children: [
      { path: "/shop/cart", element: <CartScreen /> },
      { path: "/shop/shipping", element: <ShippingAddressScreen /> },
      { path: "/shop/placeorder", element: <PlaceOrderScreen /> },
      { path: "/shop/product/:slug", element: <ProductScreen /> },
      { path: "/shop/order/:id", element: <OrderScreen /> },
      { path: "/shop/orderhistory", element: <OrderHistoryScreen /> },
      { path: "/shop/payment", element: <PaymentMethodScreen /> },
    ],
  },
];

export function isInReactRoutes(routes) {
  if (!routes) routes = ReactRoutes;
  let p = window.location.pathname;
  for (var i = 0; i < routes.length; i++) {
    if (isEqualPath(p, routes[i].path)) {
      return true;
    }
    if (routes[i].children && isInReactRoutes(routes[i].children)) {
      return true;
    }
  }
  return false;
}

function createRoute(currentRoute) {
  return (
    <React.Fragment key={currentRoute.path + "-main"}>
      <Route
        path={currentRoute.path}
        element={currentRoute.element}
        key={currentRoute.path}
      ></Route>
      {currentRoute.children != undefined &&
        currentRoute.children.map((child) => {
          return createRoute(child);
        })}
    </React.Fragment>
  );
}

export const CreateReactApp = () => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
      <StoreProvider>
        <HelmetProvider>
          <BrowserRouter>
            <header>
              <Navbar />
            </header>
            <main className="pt-3 ">
              <Routes>
                {ReactRoutes.map((route) => {
                  return createRoute(route);
                })}
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </HelmetProvider>
      </StoreProvider>
    </React.StrictMode>
  );
};
