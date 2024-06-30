import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const apiService = {
    fetchProducts: async () => {
        const response = await axiosInstance.get("/products");
        return response;
    },

    importExcel: async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axiosInstance.post(
            "/product/import-excel",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response;
    },
    registerUser: async (formData) => {
        try {
            const response = await axiosInstance.post("/register", formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    fetchUserInfo: async () => {
        try {
            const response = await axiosInstance.get("/user");
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    login: async (credentials) => {
        try {
            const response = await axiosInstance.post("/login", credentials);
            localStorage.setItem("accessToken", response.token); // Store accessToken in localStorage
            return response;
        } catch (error) {
            throw error;
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/logout");
            localStorage.removeItem("accessToken");
        } catch (error) {
            throw error;
        }
    },
};

export default apiService;
