import React from 'react';
import './App.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './Pages/Home.tsx';
import Auth from './Pages/Auth.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import IndividualExercise from './Pages/IndividualExercise.tsx';
import Dashboard from './Pages/Dashboard.tsx';
import LikedExercises from './Pages/LikedExercises.tsx'; // Import the DashboardLayout component
import Layout from './Layouts/Layout.tsx';
import DashboardLayout from './Layouts/DashboardLayout.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './app/store.ts';
import { persistStore } from 'redux-persist';
import BmiCalculator from './components/BmiCalculator.tsx';
import CustomSceduler from './components/CustomSceduler.tsx';
import ComingSoon from './Pages/ComingSoon.tsx';
import ErrorPage from './Pages/ErrorPage.tsx';
const router = createBrowserRouter([ 
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "auth",
        element: <Auth />
      },
      {
        path: "exercise/:id",
        element: <IndividualExercise/>
      },
      {
        path: "dashboard",
        element: <DashboardLayout />, 
        children: [
          {
            path: "",
            element: <Dashboard />
          },
          {
            path: "liked-exercises",
            element: <LikedExercises />
          },
          {
            path: "bmi-calculator",
            element: <BmiCalculator />
          },
          {
            path: "custom-scheduler",
            element: <CustomSceduler />
          },
          {
            path: "coming-soon",
            element: <ComingSoon/>
          },
          // {
          //   path: "personal-trainer",
          //   element: <PersonalTrainer/>
          // },

        ],
      },
      {
        path: "*",
        element: <ErrorPage/>
      }
    ]
  }
]);

const persistor = persistStore(store)
const queryClient = new QueryClient();



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
        </PersistGate>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
