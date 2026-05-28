import { motion } from "framer-motion";
import { fadeUp, fadeUpSmall } from "../../utils/motion";

export default function FadeInUp({
  children,
  className = "",
  delay = 0,
  small = false,
  as = "div",
  ...props
}) {
  const Component = motion[as] ?? motion.div;
  const variant = small ? fadeUpSmall : fadeUp;

  return (
    <Component
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: variant.hidden,
        visible: {
          ...variant.visible,
          transition: { ...variant.visible.transition, delay },
        },
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
