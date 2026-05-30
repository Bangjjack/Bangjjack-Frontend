import { useLocation, useNavigate } from "react-router";

function useGoBack(fallbackPath = "/home") {
  const navigate = useNavigate();
  const location = useLocation();
  const preventBack = (location.state as { preventBack?: boolean } | null)?.preventBack === true;

  return () => {
    if (!preventBack && location.key !== "default") {
      navigate(-1);
      return;
    }
    navigate(fallbackPath);
  };
}

export { useGoBack };
