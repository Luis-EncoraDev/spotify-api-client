import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuth2Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("jwt", token);
      navigate("/", { replace: true });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default OAuth2Callback;
