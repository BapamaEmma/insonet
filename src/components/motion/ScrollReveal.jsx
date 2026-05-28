import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../utils/motion";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  ...props
}) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          ...fadeUp.visible,
          transition: { ...fadeUp.visible.transition, delay },
        },
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
