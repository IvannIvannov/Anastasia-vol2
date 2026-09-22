import { useEffect } from "react";

interface UseRevealOnScrollOptions {
  selector: string;
  threshold?: number;
}

const useRevealOnScroll = ({
  selector,
  threshold = 0.12,
}: UseRevealOnScrollOptions) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    if (elements.length === 0) {
      return;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("show");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
        });
      },
      {
        threshold,
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [selector, threshold]);
};

export default useRevealOnScroll;
