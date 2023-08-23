import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/");
    }
    if (localStorage.getItem("userTypes") === "ADMIN") {
      navigate("/admin");
    }
    if (localStorage.getItem("userTypes") === "ENGINEER") {
      navigate("/engineer");
    }
    if (localStorage.getItem("userTypes") === "CUSTOMER") {
      navigate("/customer");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
