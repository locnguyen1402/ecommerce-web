"use client";

import { useRef, useState, useEffect } from "react";

const useScrollDirection = (threshold: number = 0) => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const lastScrollY = useRef(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const diff = Math.abs(currentScrollY - lastScrollY.current);

    if (diff < threshold) {
      return;
    }

    if (currentScrollY > lastScrollY.current) {
      setScrollDirection("down");
    } else if (currentScrollY < lastScrollY.current) {
      setScrollDirection("up");
    }

    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return scrollDirection;
};

export default useScrollDirection;
