import { useEffect, useRef } from "react";
import { trackEvent } from "./TrackingScripts";

export default function AgendaObserver({ children }) {
  const ref = useRef(null);
  const fired = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          trackEvent("AgendaViewed");
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}