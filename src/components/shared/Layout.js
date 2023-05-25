import Navbar from "./Navbar";
import Loader from "./Loader";
import { motion, AnimatePresence, animate } from "framer-motion";
import { useState, useEffect } from "react";

export default function Layout({ children, isLoading }) {
  const [showLoader, setShowLoader] = useState(true);

  const animation = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setShowLoader(false);
      }, 500);
    }
  }, [isLoading]);
  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Loader isLoading={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      {!showLoader && (
        <>
          <Navbar />
          <AnimatePresence>
            <motion.main
              variants={animation}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 1 }}
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </>
      )}
    </>
  );
}
