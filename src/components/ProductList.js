import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";
import { toast } from "react-toastify";

import apiService from "../apiService";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch products and user info on component mount
        fetchProducts();
        fetchUserData();
    }, []);

    // Function to fetch products from API
    const fetchProducts = async () => {
        try {
            const allProds = await apiService.fetchProducts();
            if (get(allProds, "status") !== 200) {
                navigate("/login");
            }
            setProducts(allProds.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Function to fetch user info from API
    const fetchUserData = async () => {
        try {
            const userInfo = await apiService.fetchUserInfo();
            setUser(userInfo);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    // Function to handle file upload (import Excel)
    const handleImportExcel = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            toast.error("Please select a file to import.");
            return;
        }

        const allowedMimeTypes = [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/csv",
            "application/vnd.oasis.opendocument.spreadsheet",
        ];

        const allowedExtensions = ["xls", "xlsx", "csv", "ods"];

        if (
            !allowedMimeTypes.includes(file.type) &&
            !allowedExtensions.includes(file.name.split(".").pop())
        ) {
            toast.error(
                "Invalid file type. Please upload an Excel file (XLS, XLSX, CSV, ODS)."
            );
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await apiService.importExcel(file);
            if (get(response, "status") === 200) {
                await fetchProducts();

                toast.success("File uploaded successfully!");
                setTimeout(() => {
                    toast.dismiss();
                }, 3000);
            } else if (get(response, "status") === 422) {
                toast.error(get(response, "message"));
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    // Function to handle logout
    const handleLogout = async () => {
        try {
            await apiService.logout();
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="pb-4">
                   
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                <div className="pb-4"> {user && <h4>Welcome, {user.name}!</h4>}</div>
                <div className="pb-4">
                    <label htmlFor="fileUpload" className="btn btn-primary">
                        Import Excel
                        <input
                            id="fileUpload"
                            type="file"
                            onChange={handleImportExcel}
                            style={{ display: "none" }}
                        />
                    </label>
                </div>
            </div>
            {products.length === 0 ? (
                <div className="alert alert-info">No products available.</div>
            ) : (
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {product.product_name} ({product.SKU})
                                    </h5>
                                    <p className="card-text">
                                        Price: ${product.price}
                                    </p>
                                    <p className="card-text">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
