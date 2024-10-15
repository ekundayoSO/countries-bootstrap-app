import { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleFunction = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleFunction);
    return () => {
      window.removeEventListener("scroll", toggleFunction);
    };
  }, []);

  return (
    <div className="back-to-top">
      {isVisible && (
        <button onClick={scrollToTop} className="back-to-top-button">
          &#8679;
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
