import { useState, useEffect, useRef, ReactNode } from "react";

interface LazyLoadProps {
  children: ReactNode;
  placeholder?: ReactNode;
  rootMargin?: string;
  threshold?: number;
}

const LazyLoad = ({ 
  children, 
  placeholder = <div className="min-h-[400px] animate-pulse bg-secondary/20 rounded-xl" />,
  rootMargin = "200px",
  threshold = 0.1
}: LazyLoadProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={ref}>
      {isVisible ? children : placeholder}
    </div>
  );
};

export default LazyLoad;
