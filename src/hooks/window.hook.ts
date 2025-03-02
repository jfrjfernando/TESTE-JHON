import { useState, useEffect, useCallback } from "preact/hooks";

export function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

export function useWindowScrollbarSize() {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  const getScrollbarWidth = useCallback(() => {
    const scrollDiv = document.createElement("div");

    scrollDiv.style.width = "100px";
    scrollDiv.style.height = "100px";
    scrollDiv.style.overflow = "scroll";
    scrollDiv.style.position = "absolute";
    scrollDiv.style.opacity = "0";
    scrollDiv.style.top = "-9999px";
    document.body.appendChild(scrollDiv);

    const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return width;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScrollbarWidth(getScrollbarWidth());
    };

    // First set
    setScrollbarWidth(getScrollbarWidth());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return scrollbarWidth;
}
