import { useEffect, useState } from 'react';

export function useIsMobile(MOBILE_BREAKPOINT = 1439.98) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    mql.addEventListener('change', onChange);

    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    return () => {
      mql.removeEventListener('change', onChange);
    };
  }, [MOBILE_BREAKPOINT]);

  return isMobile;
}
