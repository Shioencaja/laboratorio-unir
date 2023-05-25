import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getCategoriesNames } from "@/lib/fetchCategories";
import styles from "@/styles/Navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [subMenu, setSubMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  let routerName;

  switch (router.pathname) {
    case "/":
      routerName = "inicio";
      break;
    case "/projects":
      routerName = "proyectos";
      break;
    case "/about":
      routerName = "sobre nosotros";
      break;
    case "/contact":
      routerName = "contacto";
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
      const categories = await getCategoriesNames();
      setCategories(categories);
    };
    fetchData();
  }, []);

  return (
    <nav
      key={router.route}
      className={`fixed w-full top-0 z-50 ${isOpen ? "bg-white" : ""} ${
        router.pathname === "/" ? "bg-transparent" : "bg-transparent"
      }`}
      style={{ transition: "background-color 0.5s ease" }}
    >
      <div className="flex flex-col items-end ">
        <div className="w-full px-4 sm:px-6 lg:px-4 flex items-center justify-between py-4 bg-transparent">
          {routerName !== "inicio" ? (
            <div>
              {/*
              <Link href="/" onClick={isOpen ? toggleMenu : null}>
                <Image src="/logo.svg" height={33} width={99} alt="logo" />
              </Link> */}
            </div>
          ) : (
            <div></div>
          )}

          <div className={`${styles.logo_wrapper} flex`} onClick={toggleMenu}>
            <motion.div
              className={styles.circle}
              animate={!isOpen ? { right: "0px" } : { right: "48px" }}
            >
              {routerName !== "inicio" ? (
                <Image
                  src="/circulo_blanco.svg"
                  width={30}
                  height={30}
                  alt="circulo"
                />
              ) : (
                <Image
                  src="/circulo.svg"
                  width={30}
                  height={30}
                  alt="circulo"
                />
              )}
            </motion.div>
            <motion.div
              className={styles.circle}
              animate={!isOpen ? { right: "0px" } : { right: "82px" }}
            >
              {routerName !== "inicio" ? (
                <Image
                  src="/circulo_blanco.svg"
                  width={30}
                  height={30}
                  alt="circulo"
                />
              ) : (
                <Image
                  src="/circulo.svg"
                  width={30}
                  height={30}
                  alt="circulo"
                />
              )}
            </motion.div>
            <div className={styles.circle}>
              {routerName !== "inicio" ? (
                <Image
                  src="/circulo_blanco.svg"
                  width={30}
                  height={30}
                  alt="circulo"
                />
              ) : (
                <Image
                  src="/circulo.svg"
                  width={30}
                  height={30}
                  alt="circulo"
                />
              )}
            </div>
          </div>
          {/** 
          <motion.div className="hidden gap-4 md:flex md:items-center">
            {NAVLINKS.map((link, i) => (
              <div key={i}>
                {link.children ? (
                  <>
                    {link.children && (
                      <Link
                        href="/"
                        className={`${styles.nav_link} block uppercase font-bold hover:text-gray-400`}
                      >
                        <div>proyectos</div>
                      </Link>
                    )}
                  </>
                ) : (
                  <Link key={link.name} href={link.path}>
                    <p
                      className={`${styles.nav_link} block uppercase font-bold hover:text-gray-400`}
                    >
                      {link.name}
                    </p>
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
          */}
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className=" flex flex-col items-center z-90 py-4"
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
                  className="px-4  py-2 hover:text-gray-400 gap-4"
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
                      <motion.div onClick={subMenuHandler}>
                        {link.name}
                      </motion.div>
                      {subMenu ? (
                        <>
                          {link.children && (
                            <ul>
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
                                      href={`/projects?category=${child.title}`}
                                      onClick={toggleMenu}
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
                      <Link href={link.path} onClick={toggleMenu}>
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
