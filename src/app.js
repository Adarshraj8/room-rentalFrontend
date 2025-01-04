import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import RoomDetail from "./components/RoomDetail"; // Import RoomDetail component
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Payme from "./components/Payment";
import RoomOrders from "./components/Download";
const AppLayout = () => {
    return (
        
        <Router>
               <div className="container"> 
            <Header /> {/* Keep header consistent across pages */}
         
            <Routes>
                <Route path="/" element={<Body />} />
                <Route path="/room/:roomId" element={<RoomDetail />} />
                <Route path="/about" element={<AboutUs/>} />
                <Route path="/contact" element={<ContactUs/>} />
                <Route path="/pay/:roomId" element={<Payme/>} />
                <Route path="/status" element={<RoomOrders/>} />
            </Routes>
            
            <Footer /> {/* Keep footer consistent across pages */}
          </div>
           </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
