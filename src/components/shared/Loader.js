import { motion } from "framer-motion";

export default function Loader() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex relative" style={{ gap: "1rem" }}>
          <div className="relative">
            <svg
              className="h-[60px] w-[60px] md:h-[150px] md:w-[150px]"
              viewBox="0 0 150 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M75 0C33.5786 0 0 33.5786 0 75C0 116.421 33.5786 150 75 150C116.421 150 150 116.421 150 75C150 33.5786 116.421 0 75 0ZM75 25C47.3858 25 25 47.3858 25 75C25 102.614 47.3858 125 75 125C102.614 125 125 102.614 125 75C125 47.3858 102.614 25 75 25Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <motion.div className="relative">
            <svg
              className="h-[60px] w-[60px] md:h-[150px] md:w-[150px]"
              viewBox="0 0 150 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M75 0C33.5786 0 0 33.5786 0 75C0 116.421 33.5786 150 75 150C116.421 150 150 116.421 150 75C150 33.5786 116.421 0 75 0ZM75 25C47.3858 25 25 47.3858 25 75C25 102.614 47.3858 125 75 125C102.614 125 125 102.614 125 75C125 47.3858 102.614 25 75 25Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ x: "0px" }}
            animate={{ x: "35px" }}
            transition={{
              ease: "easeInOut",
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <svg
              className="h-[60px] w-[60px] md:h-[150px] md:w-[150px]"
              viewBox="0 0 150 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M75 0C33.5786 0 0 33.5786 0 75C0 116.421 33.5786 150 75 150C116.421 150 150 116.421 150 75C150 33.5786 116.421 0 75 0ZM75 25C47.3858 25 25 47.3858 25 75C25 102.614 47.3858 125 75 125C102.614 125 125 102.614 125 75C125 47.3858 102.614 25 75 25Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </>
  );
}
