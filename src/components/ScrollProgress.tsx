"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return <motion.div className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-forge" style={{ scaleX }} />;
}
