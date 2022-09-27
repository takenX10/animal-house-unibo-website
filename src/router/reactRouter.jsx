import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import CercoPartner from '@/views/react/comunita/CercoPartner/CercoPartner';
import HomePage from '@/views/react/homes/HomePage';
import HomeFrontOffice from '@/views/react/homes/HomeFrontOffice';
import HomeComunita from '@/views/react/homes/HomeComunita';
import EccoloQua from '@/views/react/comunita/EccoloQua';
import HomeScreen from '@/views/react/ecommerce/HomeScreen';
import CartScreen from '@/views/react/ecommerce/CartScreen';
import ShippingAddressScreen from '@/views/react/ecommerce/ShippingAddressScreen';
import PlaceOrderScreen from '@/views/react/ecommerce/PlaceOrderScreen';
import ProductScreen from '@/views/react/ecommerce/ProductScreen';
import OrderScreen from '@/views/react/ecommerce/OrderScreen';
import OrderHistoryScreen from '@/views/react/ecommerce/OrderHistoryScreen';
import PaymentMethodScreen from '@/views/react/ecommerce/PaymentMethodScreen';
import HomeServiceFaceToFace from '@/views/react/services/HomeServiceFaceToFace';
import Login from '@/views/react/logins/Login';
import { StoreProvider } from '@/context/store';
import { isEqualPath } from '@/context/utils'

export const ReactRoutes = [
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/office",
    element: <HomeFrontOffice />
  },
  {
    path: "/backoffice/login",
    element: <Login />
  },
  {
    path: "/comunita",
    element: <HomeComunita />,
    children: [
      {
        path: "/comunita",
        element: <HomeComunita />
      },
      {
        path: "/comunita/cerco-partner",
        element: <CercoPartner />
      },
      {
        path: "/comunita/eccolo-qua",
        element: <EccoloQua />
      },
    ]
  },
  {
    path: "/services/facetoface",
    element: <HomeServiceFaceToFace />,
    children:
      [
        {
          path: "/services/facetoface/:slug",
          element: <HomeServiceFaceToFace />
        },
      ],
  },
  {
    path: "/shop",
    element: <HomeScreen />,
    children: [
      {
        path: "/shop",
        element: <HomeScreen />
      },
      {
        path: "/shop/cart",
        element: <CartScreen />
      },
      {
        path: "/shop/shipping",
        element: <ShippingAddressScreen />
      },
      {
        path: "/shop/placeorder",
        element: <PlaceOrderScreen />
      },
      {
        path: "/shop/product/:slug",
        element: <ProductScreen />
      },
      {
        path: "/shop/order/:id",
        element: <OrderScreen />
      },
      {
        path: "/shop/orderhistory/:id",
        element: <OrderHistoryScreen />
      },
      {
        path: "/shop/payment/:id",
        element: <PaymentMethodScreen />
      },
    ]
  }
  // {
  //   path: "/users",
  //   element: <Users />,
  //   children: [
  //     { path: ":id", element: <Profile /> },
  //     { path: "/settings", element: <Settings /> },
  //   ],
  // },
];


export function isInReactRoutes(routes) {
  if (!routes) return false;
  let p = window.location.pathname;
  for (var i = 0; i < routes.length; i++) {
    if (isEqualPath(p, routes[i].path)) {
      return true;
    }
    if (isInReactRoutes(routes[i].children)) {
      return true;
    }
  }
  return false;
}

function createRoute(currentRoute, index) {
  return (
    <Route path={currentRoute.path} element={currentRoute.element} key={currentRoute.path + "-" + index}>
      {
        currentRoute.children != undefined &&

        currentRoute.children.map((child, index) => {
          return (createRoute(child, index));
        })
      }</Route>
  );
}

export const CreateReactApp = () => {
  ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
      <StoreProvider>
        <HelmetProvider>
          <BrowserRouter>
            <Routes>
              {ReactRoutes.map((route, index) => {
                return createRoute(route, index)
              })}
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </StoreProvider>
    </React.StrictMode>
  )
};
