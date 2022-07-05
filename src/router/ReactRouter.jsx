import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Expenses from '@/views/react/Expenses';
import CercoPartner from '@/views/react/comunita/CercoPartner/CercoPartner';

export const ReactRoutes = [
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
    {
        path: "/comunita/cerco-partner",
        element: <CercoPartner />
    },
];


export function isInReactRoutes() {
    let p = window.location.pathname;
    for (var i = 0; i < ReactRoutes.length; i++) {
        if (p == ReactRoutes[i].path)
            return true;
    }
    return false;
}

export const CreateReactApp = () => {
    ReactDOM.createRoot(document.getElementById('app')).render(
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    {ReactRoutes.map((route, i) => (
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
};