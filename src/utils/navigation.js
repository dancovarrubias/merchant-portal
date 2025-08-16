'use client';
import { useRouter as useNextRouter } from 'next/navigation';

// Custom hook that mimics React Router's useNavigate
export const useNavigate = () => {
  const router = useNextRouter();
  return router.push;
};

// Export the Next.js router with the same name as React Router
export const useRouter = useNextRouter;