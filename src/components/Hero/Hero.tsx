import { motion } from "motion/react";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f3efe8] px-6 pb-10 pt-28 text-[#181714] md:px-10 lg:px-14">
      <div className="flex min-h-[calc(100vh-9rem)] flex-col justify-between">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 max-w-sm text-sm leading-relaxed md:ml-auto"
          >
            Video Editor · Graphic Designer · UGC Creator · Social Media Manager
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[15vw] font-medium uppercase leading-[0.78] tracking-[-0.075em]"
            >
              Anastasia
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[15vw] font-medium uppercase leading-[0.78] tracking-[-0.075em]"
            >
              Paskaleva
            </motion.h1>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-16 flex items-end justify-between border-t border-black/20 pt-4"
        >
          <p className="text-xs uppercase tracking-[0.14em]">
            Plovdiv · Bulgaria
          </p>

          <a
            href="#work"
            className="group flex items-center gap-3 text-xs uppercase tracking-[0.14em]"
          >
            Selected work
            <span className="transition-transform duration-300 group-hover:translate-y-1">
              ↓
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
