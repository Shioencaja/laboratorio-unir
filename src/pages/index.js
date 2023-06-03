import { AnimatePresence, motion, useInView } from "framer-motion";
import { getAllCategories } from "@/lib/fetchCategories";
import Image from "next/image";
import React from "react";
import PageContent from "@/components/shared/PageContent";
import { useEffect, useRef } from "react";

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

export default function Projects({ categories }) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <>
      <PageContent>
        <section className="h-[65vh] w-full flex flex-col justify-center items-center py-8 sticky top-0 bg-white text-rojo-500 md:h-[70vh] pt-0">
          <div className="w-[40%] min-w-[300px] h-full object-cover">
            <Image
              src="/logo.svg"
              width={99}
              height={33}
              alt="logo"
              className="w-full h-full"
            />
          </div>
        </section>
        <section className="relative z-10 bg-rojo-500 text-white" ref={ref}>
          <div className="w-ful flex flex-col gap-4">
            {/*Categorías de proyectos */}
            <AnimatePresence>
              <motion.div
                className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
                variants={ProjectsAnimation}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
              >
                {categories.map((category, i) => (
                  <motion.a
                    key={i}
                    href={`/category/${category.slug}`}
                    variants={CategoryAnimation}
                    className="group"
                  >
                    <motion.div className="flex flex-col gap-2 relative w-full h-full aspect-square justify-center cursor-pointer overflow-hidden">
                      <div className="relative w-full min-h-[400px] h-full">
                        <Image
                          src={category.icon.url}
                          height={category.icon.height}
                          width={category.icon.width}
                          className="h-full w-full object-cover absolute top-0 left-0 z-10 group-hover:opacity-0 transition all ease-in-out duration-300"
                          alt="prueba"
                        />
                        <Image
                          src={category.mainImage.url}
                          height={category.mainImage.height}
                          width={category.mainImage.width}
                          className="h-full w-full object-cover"
                          alt="prueba"
                        />
                      </div>
                      <div className="w-full absolute bottom-4 left-0 z-20 group-hover:opacity-0">
                        <h3 className="text-black text-3xl font-black text-center w-full">
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

export async function getServerSideProps(context) {
  const { locale } = context;
  const categories = await getAllCategories(locale);

  return {
    props: {
      categories,
    },
  };
}
