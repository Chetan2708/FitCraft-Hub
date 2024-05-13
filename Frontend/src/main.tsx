import React from 'react';
import './App.css'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.tsx";
import Home from './Pages/Home.tsx';
import Auth from './Pages/Auth.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

import { Provider } from 'react-redux';
import {store} from './app/store.ts'



const router = createBrowserRouter([ 

    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Home />
            } ,
            {
                path: "auth",
                element: <Auth />
            }
           
        ]
    }
   
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
         <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen />
         </QueryClientProvider>
        </Provider>
    </React.StrictMode>
  
)
