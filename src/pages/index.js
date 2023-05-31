import { AnimatePresence, motion, useInView } from "framer-motion";
import { getAllCategories } from "@/lib/fetchCategories";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import React from "react";
import PageContent from "@/components/shared/PageContent";
import { useEffect, useRef } from "react";

export default function Projects({ categories }) {
  const ProjectsAnimation = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const CategoryAnimation = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
  };

  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <>
      <PageContent>
        <section className={styles.header}>
          <div className={styles.logo}>
            <Image
              src="/logo.svg"
              width={99}
              height={33}
              alt="logo"
              className="w-full h-full"
            />
          </div>
        </section>
        <section className={styles.categories_section} ref={ref}>
          <div className={styles.categories_container}>
            {/*Categorías de proyectos */}
            <AnimatePresence>
              <motion.div
                className={styles.categories_wrapper}
                variants={ProjectsAnimation}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
              >
                {categories.map((category, i) => (
                  <motion.a
                    key={i}
                    href={`/projects?category=${category.title}`}
                    variants={CategoryAnimation}
                  >
                    <motion.div className={styles.category}>
                      <div className={styles.category_images_container}>
                        <div className={styles.screen}></div>
                        <Image
                          src={category.image.url}
                          height={category.image.height}
                          width={category.image.width}
                          className={styles.image_primary}
                          alt="prueba"
                        />
                        <Image
                          src={category.secondaryImage.url}
                          height={category.secondaryImage.height}
                          width={category.secondaryImage.width}
                          className={styles.image_secondary}
                          alt="prueba"
                        />
                      </div>
                      <div className={styles.category_data}>
                        <h3 className={styles.category_title}>
                          {category.title}
                        </h3>
                      </div>
                    </motion.div>
                  </motion.a>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </PageContent>
    </>
  );
}

export async function getStaticProps() {
  const categories = await getAllCategories();

  return {
    props: {
      categories,
    },
  };
}
