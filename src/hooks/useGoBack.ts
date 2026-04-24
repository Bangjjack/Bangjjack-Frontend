import { useLocation, useNavigate } from "react-router";

function useGoBack(fallbackPath = "/home") {
  const navigate = useNavigate();
  const location = useLocation();

  return () => {
    if (location.key !== "default") {
      navigate(-1);
      return;
    }
    navigate(fallbackPath);
  };
}

export { useGoBack };
