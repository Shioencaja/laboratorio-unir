import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Head from "next/head";
import { getAllProjects } from "@/lib/fetchProjects";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "@/styles/Projects.module.css";
import PageContent from "@/components/shared/PageContent";

export default function Projects({ projects }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(
    router.query.category
  );
  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category === selectedCategory)
    : projects;

  let category = router.query.category ? router.query.category : "Proyectos";

  if (router.query.category === "Arquitectura Temporal") {
    category = "ARQ.Temporal";
  }

  const Heading = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const letterAnimation = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: 20,
    },
  };
  const ProjectContainerAppear = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1,
      },
    },
  };

  const ProjectAppear = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    setSelectedCategory(router.query.category);
  }, [router.query.category]);

  return (
    <>
      <Head>
        <title>Proyectos</title>
        <meta
          name="description"
          content="Portfolio of John Doe, architect and designer"
        />
        <meta
          name="keywords"
          content="architecture, design, portfolio, John Doe"
        />
        <meta name="author" content="John Doe" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent key={router.query.category}>
        <AnimatePresence>
          <motion.div
            className={styles.projects_header}
            variants={Heading}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {[...category].map((letter, i) => (
              <motion.span
                key={i}
                variants={letterAnimation}
                className={styles.row_text}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
        {/*
      {isOpen && (
        <div className="filters bg-white">
          <div className="categories flex flex-col ">
            <button onClick={toogle}>Cerrar</button>
            <button onClick={() => handleAllButtonClick("")}>All</button>
            {categories.map((category, i) => (
              <button
                key={category.title}
                onClick={() => handleAllButtonClick(category.title)}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      )}
      {!isOpen && (
        <button
          className="fixed bottom-20 right-5 z-10 bg-white p-8"
          type="button"
          onClick={toogle}
        >
          Filtro
        </button>
      )}
      */}
        <section className={styles.projects_container}>
          <AnimatePresence mode="wait">
            <motion.div
              className={`${styles.projects_wrapper}`}
              variants={ProjectContainerAppear}
              initial="initial"
              animate="animate"
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  variants={ProjectAppear}
                  style={{ originX: 0 }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className={styles.project}
                  >
                    <motion.div
                      className={styles.project_main_image}
                      whileOnHover={{ scale: 1.05 }}
                    >
                      <Image
                        src={project.gallery.url}
                        width={project.gallery.width}
                        height={project.gallery.height}
                        alt={project.title}
                        className={styles.mainImage}
                      />
                    </motion.div>
                    <div className={styles.project_data_container}>
                      {/**
                    {project.image ? (
                      <div className={styles.project_icon}>
                        <Image
                          src={project.image.url}
                          height={project.image.height}
                          width={project.image.width}
                          className="h-full w-full object-cover"
                          alt={project.title}
                        />
                      </div>
                    ) : null}
                     */}
                      <p className={styles.project_title}>{project.title}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>
      </PageContent>
    </>
  );
}

export async function getStaticProps() {
  const projects = await getAllProjects();

  return {
    props: {
      projects,
    },
  };
}
