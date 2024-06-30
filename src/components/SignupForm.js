import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";

import apiService from "../apiService";

const SignupForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form data to send to the server
        const formData = {
            name: name,
            password: password,
            email: email,
        };

        try {
            const response = await apiService.registerUser(formData);
            // Check if response status is ok (assuming successful registration returns a status code 200)
            if (response.status === 200) {
                toast.success("User registered successfully!");
                setSuccess(true); // Set success state to true
                navigate("/login"); // Navigate to login page
            } else {
                // Handle other possible response statuses or errors
                throw new Error("Registration failed. Please try again.");
            }
        } catch (error) {
            toast.success("Registration failed. Please try again");
            console.error("Error registering user:", error);
            setError("Registration failed. Please try again.");
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">
                                Signup Form
                            </h2>
                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="alert alert-success">
                                    User Registered successful!
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="name"
                                        className="form-label"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Signup
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
