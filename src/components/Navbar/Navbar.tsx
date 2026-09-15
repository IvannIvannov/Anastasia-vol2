import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import "./Navbar.css";

const navItems = [
  { label: "Work", href: "#reels" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0,
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (isOpen) {
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY <= 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleMenuToggle = () => {
    setIsOpen((current) => {
      const nextState = !current;

      if (nextState) {
        setIsVisible(true);
      }

      return nextState;
    });
  };

  const handleNavClick = () => {
    setIsOpen(false);
    setIsVisible(true);
  };

  return (
    <header
      className={`navbar ${
        scrolled ? "navbar--scrolled" : ""
      } ${!isVisible ? "navbar--hidden" : ""}`}
    >
      <nav className="navbar__inner">
        <a href="#top" className="navbar__brand" onClick={handleNavClick}>
          Anastasia Paskaleva
        </a>

        <div className="navbar__desktop">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="navbar__link">
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className={`navbar__menu-button ${
            isOpen ? "navbar__menu-button--open" : ""
          }`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={handleMenuToggle}
        >
          <span />
          <span />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{
              opacity: 0,
              y: -12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="navbar__mobile-links">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  initial={{
                    opacity: 0,
                    y: 16,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span>{item.label}</span>
                  <span>↗</span>
                </motion.a>
              ))}
            </div>

            <div className="navbar__mobile-footer">
              <span>Creative Portfolio · 2026</span>
              <span>Plovdiv / Sofia, Bulgaria</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
