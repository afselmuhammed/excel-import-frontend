import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

import ProductList from "./components/ProductList";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <Router>
            <div className="App">
                <div>
                    <ToastContainer />
                </div>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/products" element={<ProductList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
