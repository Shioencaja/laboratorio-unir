import { getAllProjects } from "@/lib/fetchProjects";
import { getAllCategories, getCategory } from "@/lib/fetchCategories";
import { motion, AnimatePresence } from "framer-motion";
import PageContent from "@/components/shared/PageContent";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

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

export default function Category({ projects, category }) {
  const { title } = category;
  const router = useRouter();
  const { locale } = router;
  return (
    <>
      <PageContent key={router}>
        <Link
          href="/"
          className="flex items-center gap-4 font-black text-md absolute top-0 left-0 p-4 z-50  uppercase md:hover:bg-marron md:hover:text-white transition-all ease-in-out duration-300"
        >
          <BiArrowBack /> {locale === "en" ? "Categories" : "Categorías"}
        </Link>
        <AnimatePresence mode="wait">
          <motion.div
            className="sticky top-16 w-full h-[30vh] flex flex-start p-4 mt-16 font-black uppercase text-[10vw] md:text-[12vw] leading-none"
            variants={Heading}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {[...title].map((letter, i) => (
              <motion.span
                key={i}
                variants={letterAnimation}
                className="flex flex-col justify-center"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>

        <section className="w-full flex flex-col items-center relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full"
              variants={ProjectContainerAppear}
              initial="initial"
              animate="animate"
            >
              {projects.map((project, i) => (
                <motion.div
                  key={i}
                  variants={ProjectAppear}
                  style={{ originX: 0 }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex flex-col relative group"
                  >
                    <motion.div
                      className="w-full overflow-hidden aspect-square relative"
                      whileOnHover={{ scale: 1.05 }}
                    >
                      {project.icon ? (
                        <div className="w-full h-full flex absolute top-0 left-0 group-hover:opacity-0 transition all ease-in-out duration-300">
                          <Image
                            src={project.icon.url}
                            height={project.icon.height}
                            width={project.icon.width}
                            className="h-full w-full object-cover"
                            alt={project.title}
                          />
                        </div>
                      ) : (
                        <div className="absolute h-full w-full bg-white"></div>
                      )}
                      <Image
                        src={project.mainImage.url}
                        width={project.mainImage.width}
                        height={project.mainImage.height}
                        alt={project.title}
                        className="object-cover w-full h-full"
                      />
                    </motion.div>
                    <div className="mt-1 flex gap-4 w-full items-center justify-center absolute bottom-0 p-4 z-50 text-black group-hover:opacity-0 transition all ease-in-out duration-300">
                      <p className="text-xl font-bold text-center">
                        {project.title}
                      </p>
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

export async function getServerSideProps(context) {
  const { params, locale } = context;
  const category = params.slug;
  const categoryData = await getCategory(locale, category);
  const projects = await getAllProjects(locale, category);

  return {
    props: {
      projects,
      category: categoryData[0],
    },
  };
}

export async function getServerSidePaths(context) {
  const { locale } = context;
  const paths = await getAllCategories(locale);

  return {
    paths,
    fallback: false,
  };
}
