import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getCategoriesNavBar } from "@/lib/fetchCategories";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [subMenu, setSubMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { locale } = router;
  let routerName;

  switch (router.pathname) {
    case "/":
      routerName = "inicio";
      break;
    default:
      routerName = router.pathname;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setSubMenu(false);
  };

  const subMenuHandler = () => {
    setSubMenu(!subMenu);
  };

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategoriesNavBar(locale);
      setCategories(categories);
    };
    fetchData();
  }, [locale]);

  return (
    <nav
      key={router.route}
      className={`fixed top-0 w-full flex justify-end z-50  ${
        router.pathname === "/"
          ? `text-red-500`
          : `${
              isOpen
                ? "text-red-500 md:text-white md:bg-rojo-500"
                : "text-white"
            }`
      } transition-background-color duration-500 ease-in-out `}
      style={{ transition: "background-color 0.5s ease" }}
    >
      <div className="flex flex-col md:flex-row-reverse items-center">
        <div className="w-full px-4 sm:px-6 lg:px-4 flex items-center justify-between py-4 bg-transparent">
          <div
            className="flex relative w-[120px] h-[30px] cursor-pointer z-50"
            onClick={toggleMenu}
          >
            <motion.div
              className="h-[30px] w-[30px] flex items-center justify-center absolute right-0 top-0 "
              animate={!isOpen ? { right: "0px" } : { right: "48px" }}
            >
              <svg
                width="150"
                height="150"
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
              className="h-[30px] w-[30px] flex items-center justify-center absolute right-0 top-0 "
              animate={!isOpen ? { right: "0px" } : { right: "82px" }}
            >
              <svg
                width="150"
                height="150"
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
            <div className="h-[30px] w-[30px] flex items-center justify-center absolute right-0 top-0 ">
              <svg
                width="150"
                height="150"
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
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed bg-white w-full h-full left-0 top-0 justify-center flex flex-col md:flex-row md:bg-transparent md:relative items-center z-90"
              style={{ originX: 1 }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: 1,
                opacity: 1,
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              exit={{ scaleX: 0, opacity: 0 }}
            >
              {NAVLINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  className="flex items-center flex-col md:flex-row  px-4 py-2 gap-4 font-black text-2xl"
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.1,
                  }}
                >
                  {link.children ? (
                    <>
                      <motion.div
                        onClick={subMenuHandler}
                        className="cursor-pointer transition-all duration-300 hover:text-gray-400"
                      >
                        <motion.p
                          initial={{ x: "100%", opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: "100%", opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: i * 0.05,
                          }}
                        >
                          {link.name}
                        </motion.p>
                      </motion.div>
                      {subMenu ? (
                        <>
                          {link.children && (
                            <ul className="flex flex-col md:flex-row items-center gap-2 font-medium text-lg">
                              <motion.li
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: i * 0.05,
                                }}
                              >
                                <Link
                                  className="w-full flex min-w-max cursor-pointer hover:text-gray-400"
                                  href={`/`}
                                  onClick={toggleMenu}
                                >
                                  Categorías
                                </Link>
                              </motion.li>
                              <AnimatePresence>
                                {categories.map((child, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ x: "100%", opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: "100%", opacity: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      delay: i * 0.05,
                                    }}
                                  >
                                    <Link
                                      href={`/category/${child.slug}`}
                                      onClick={toggleMenu}
                                      className="w-full flex min-w-max cursor-pointer hover:text-gray-400"
                                    >
                                      {child.title}
                                    </Link>
                                  </motion.li>
                                ))}
                              </AnimatePresence>
                            </ul>
                          )}
                        </>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <Link
                        href={link.path}
                        onClick={toggleMenu}
                        className="cursor-pointer hover:text-gray-400"
                      >
                        {link.name}
                      </Link>
                    </>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

const NAVLINKS = [
  {
    name: "Proyectos",
    path: "/projects",
    children: true,
  },
  {
    name: "Nosotros",
    path: "/about",
  },

  {
    name: "Contacto",
    path: "/contact",
  },
];
