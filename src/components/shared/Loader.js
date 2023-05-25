import { motion } from "framer-motion";
import Image from "next/image";

export default function Loader() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex relative" style={{ gap: "1rem" }}>
          <div className="relative" style={{ width: "60px" }}>
            <Image src="/circulo.svg" width={100} height={100} alt="circulo" />
          </div>
          <motion.div className="relative" style={{ width: "60px" }}>
            <Image src="/circulo.svg" width={100} height={100} alt="circulo" />
          </motion.div>
          <motion.div
            className="relative"
            style={{ width: "60px" }}
            initial={{ x: "0px" }}
            animate={{ x: "35px" }}
            transition={{
              ease: "easeInOut",
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Image src="/circulo.svg" width={100} height={100} alt="circulo" />
          </motion.div>
        </div>
      </div>
    </>
  );
}
