const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <nav className="flex items-center justify-between px-6 py-6 md:px-10 lg:px-14">
        <a href="#" className="text-sm font-medium uppercase tracking-[0.14em]">
          Anastasia Paskaleva
        </a>

        <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.14em] md:flex">
          <a href="#reels" className="transition-opacity hover:opacity-50">
            Work
          </a>
          <a href="#about" className="transition-opacity hover:opacity-50">
            About
          </a>
          <a href="#services" className="transition-opacity hover:opacity-50">
            Services
          </a>
          <a href="#contact" className="transition-opacity hover:opacity-50">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
