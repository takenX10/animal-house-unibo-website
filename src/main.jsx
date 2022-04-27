import { routes as vueRoutes } from './router';
import { createApp } from 'vue'
import AppVue from './App.vue'
import { createPinia } from "pinia"
import { router } from './router'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AppReact from './Appreact'
import Expenses from "./views/react/expenses";

import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const reactRoutes = [
  {
    path: "/expenses",
    element: <Expenses />,
    // children: [
    //   { path: ":id", element: <Invoice /> },
    //   { path: "/pending", element: <Pending /> },
    //   { path: "/complete", element: <Complete /> },
    // ],
  },
  // {
  //   path: "/users",
  //   element: <Users />,
  //   children: [
  //     { path: ":id", element: <Profile /> },
  //     { path: "/settings", element: <Settings /> },
  //   ],
  // },
];

function isInReactRoutes() {
  let p = window.location.pathname;
  for (var i = 0; i < reactRoutes.length; i++) {
    if (p == reactRoutes[i].path)
      return true;
  }
  return false;
}

function isInVueRoutes() {
  let p = window.location.pathname;
  for (var i = 0; i < vueRoutes.length; i++) {
    if (p == vueRoutes[i].path)
      return true;
  }
  return false;
}

if (isInVueRoutes()) {

  const app = createApp(AppVue)

  app.use(createPinia())
  app.use(BootstrapVue3)

  app.use(router)

  app.mount('#app')
} else if (isInReactRoutes()) {
  ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {reactRoutes.map((route, i) => (
            <Route key={i}
              path={route.path}
              element={route.element}
              render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
              )}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
}
