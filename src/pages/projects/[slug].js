import { getProjectPaths } from "@/lib/fetchProjects";
import { getSingleProject } from "@/lib/fetchProjects";
import Image from "next/image";
import PageContent from "@/components/shared/PageContent";
import { useState } from "react";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

export default function Project({ project }) {
  const { title, body, area, category, gallery, icon, year, concept } = project;

  const [isConcept, setIsConcept] = useState(false);

  return (
    <>
      <PageContent>
        <Link
          href={`/category/${category.slug}`}
          className="flex items-center gap-4 font-black text-md absolute top-0 left-0 p-4 z-50  uppercase md:hover:bg-marron md:hover:text-white transition-all ease-in-out duration-300"
        >
          <BiArrowBack /> {category.title}
        </Link>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 bg-rojo-500 text-white w-full px-4 md:px-16`}
        >
          <div className="relative md:sticky top-16 md:h-screen items-start justify-center flex flex-col gap-8 md:mt-16 mb-8 ">
            <div className="flex flex-col gap-4 max-w-3xl ">
              {icon ? (
                <div className="w-full max-w-[100px] bg-white rounded-full overflow-hidden">
                  <Image
                    src={icon.url}
                    height={icon.height}
                    width={icon.width}
                    alt={title + "icono"}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}

              <h1 className="text-5xl font-black">{title}</h1>
              <div className="font-medium flex flex-start gap-4">
                {area ? <p className="text-lg">{area}</p> : null}
                {year ? <p className="text-lg">{year}</p> : null}
              </div>
              {body ? <p className="text-md">{body}</p> : null}
            </div>
          </div>

          <div className="w-full flex flex-col mt-16 gap-4">
            {concept ? (
              <div className="flex w-full gap-4">
                <button
                  type="button"
                  className="bg-marron w-full flex justify-center items-center text-white font-bold text-lg py-2 rounded-md uppercase"
                  onClick={() => setIsConcept(false)}
                >
                  Galería
                </button>
                <button
                  type="button"
                  className="bg-marron w-full flex justify-center items-center text-white font-bold text-lg py-2 rounded-md uppercase"
                  onClick={() => setIsConcept(true)}
                >
                  Concepto
                </button>
              </div>
            ) : null}
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

export async function getServerSidePaths(context) {
  const { locales } = context;
  const projects = await getProjectPaths();
  let paths = [];

  projects.forEach((project) => {
    locales.forEach((locale) => {
      paths.push({ params: { slug: project.slug }, locale });
    });
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getServerSideProps(context) {
  const { params, locale } = context;
  const slug = params.slug;
  const project = await getSingleProject(locale, slug);

  return {
    props: {
      project,
    },
  };
}
