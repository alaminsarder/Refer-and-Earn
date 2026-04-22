import api from "./api";

export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const getMe = () => api.get("/users/me");
export const myReferrals = () => api.get("/users/my-referrals");
export const payFirst = () => api.post("/subscriptions/pay-first");