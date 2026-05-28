import { motion } from "framer-motion";
import { floatLoop, scaleIn } from "../../utils/motion";

export default function FloatingImage({ src, alt, className = "" }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={scaleIn}
      className="relative w-full"
    >
      <motion.img
        src={src}
        alt={alt}
        className={className}
        animate={floatLoop}
      />
    </motion.div>
  );
}
