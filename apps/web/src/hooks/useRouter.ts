import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useRouter = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      reload: () => window.location.reload(),
      push: (href: string) => navigate(href),
      replace: (href: string) => navigate(href, { replace: true }),
      params: searchParams,
    }),
    [navigate, searchParams],
  );

  return router;
};
