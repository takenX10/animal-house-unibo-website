import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import CercoPartner from '@/views/react/comunita/CercoPartner/CercoPartner';
import HomePage from '@/views/react/HomePage';
import HomeFrontOffice from '../views/react/HomeFrontOffice';
import HomeComunita from '../views/react/HomeComunita';
import EccoloQua from '../views/react/comunita/EccoloQua';

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
        path: "/comunita",
        element: <HomeComunita />,
        children:[
            {
                path:"/comunita",
                element:<HomeComunita />
            },
            {
                path:"/comunita/cerco-partner",
                element:<CercoPartner />
            },
            {
                path:"/comunita/eccolo-qua",
                element:<EccoloQua />
            },
        ]
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


export function isInReactRoutes(routes) {
    if(!routes) return false;
    let p = window.location.pathname;
    for (var i = 0; i < routes.length; i++) {
        if (p == routes[i].path){
            console.log("si normale");
            return true;
        }
        if(isInReactRoutes(routes[i].children)){
            console.log("si figlio");
            return true;
        }
    }
    return false;
}

function createRoute (currentRoute){
    return (
        <>
            <Route path={currentRoute.path} element={currentRoute.element} key={currentRoute.path}></Route>
            {   
                (currentRoute.children != undefined?
                    currentRoute.children.map((child)=>{
                        return(createRoute(child));
                    }):
                    (<></>)
                )
            }
        </>
    );
}

export const CreateReactApp = () => {
    ReactDOM.createRoot(document.getElementById('app')).render(
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                {ReactRoutes.map((route) => {
                    return createRoute(route)
                })}
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    )
};