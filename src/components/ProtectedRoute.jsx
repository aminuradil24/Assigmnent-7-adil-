import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { getUser } from "../utils/auth";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const user = getUser();

  useEffect(() => {
    if (!user) toast.error("এই পেজ দেখতে আগে সাইন ইন করুন");
  }, [user]);

  if (!user) {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }

  return children;
}
