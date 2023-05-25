import { getAllProjects } from "@/lib/fetchProjects";
import { getSingleProject } from "@/lib/fetchSingleProject";
import Image from "next/image";
import styles from "@/styles/singleProject.module.css";
import PageContent from "@/components/shared/PageContent";
import { useState } from "react";

export default function Project({ project }) {
  const { title, body, area, category, gallery, image, year, concept } =
    project;

  const [isConcept, setIsConcept] = useState(false);

  const handleConcept = () => {
    setIsConcept(!isConcept);
  };
  return (
    <>
      <PageContent>
        <div className={`${styles.projectContainer} px-4 md:px-16 max-w-5xl`}>
          <div className="relative md:sticky top-16 h-screen items-start justify-center flex flex-col gap-8 md:mt-16 mb-8 ">
            <div className="flex flex-col gap-4 max-w-3xl ">
              <div className="w-full max-w-[100px] bg-white rounded-full">
                <Image
                  src={image.url}
                  height={image.height}
                  width={image.width}
                  alt={title + "icono"}
                  className="h-full w-full object-cover"
                />
              </div>
              <h1 className={styles.project_title}>{title}</h1>
              <div className={styles.data}>
                {area ? <p className="text-black text-lg">{area}</p> : null}
                {category ? (
                  <p className="text-black text-lg">{category}</p>
                ) : null}
                {year ? <p className="text-black text-lg">{year}</p> : null}
              </div>
              {body ? <p className="text-black text-md">{body}</p> : null}
            </div>
            {concept ? (
              <button
                type="button"
                className={styles.button}
                onClick={handleConcept}
              >
                {isConcept ? "Galería" : "Concepto"}
              </button>
            ) : null}
          </div>
          <div className="w-full flex flex-col mt-16 gap-4">
            {isConcept ? (
              <>
                {concept?.map((image, i) => (
                  <div key={i}>
                    <Image
                      src={image.url}
                      height={image.height}
                      width={image.width}
                      alt="prueba"
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                {gallery.map((image, i) => (
                  <div key={i} className="w-full h-full">
                    <Image
                      src={image.url}
                      height={image.height}
                      width={image.width}
                      alt={title + i}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </PageContent>
    </>
  );
}

export async function getStaticPaths() {
  const projects = await getAllProjects();
  const paths = projects.map((project) => ({
    params: { slug: project.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const project = await getSingleProject(slug);

  return {
    props: {
      project,
    },
  };
}
