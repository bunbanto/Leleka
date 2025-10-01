'use client';
import { useEffect, useState } from 'react';
import Loader from '../ui/Loader/Loader';

export default function PageLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // або до завершення ініціалізації
    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loader size={16} /> : <>{children}</>;
}
