
import { Outlet } from 'react-router-dom';
import Footer from './components/Home/Footer';
import Navbar from './components/Home/Navbar';
import React from 'react';


//       {/* <Route path="/exercise/:id" element={<Excercisedetails/>} /> */}
const Layout: React.FC = () =>{

  return (
    <>
     <Navbar/>
     <Outlet/>
     <Footer/>
    </>
  )
}

export default Layout