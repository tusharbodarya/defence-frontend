// utils/auth.js
export const isLoggedIn = () => {
  const token = localStorage.getItem("authToken");
  return !!token;
};
