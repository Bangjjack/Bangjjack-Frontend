import { useNavigate } from "react-router";

function useGoBack(fallbackPath = "/home") {
  const navigate = useNavigate();

  return () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
      return;
    }
    navigate(fallbackPath);
  };
}

export { useGoBack };
