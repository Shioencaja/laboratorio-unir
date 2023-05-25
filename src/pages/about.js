import PageContent from "@/components/shared/PageContent";
import Image from "next/image";

export default function About() {
  return (
    <>
      <PageContent>
        <div className="w-full flex flex-col items-center p-4 mt-16 gap-16">
          <h1 className="titulo font-black">Sobre Nosotros</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="col-span-1 flex flex-col gap-4">
              <div className="w-full aspect-square md:h-[700px] relative">
                <Image
                  src="/IMAG0506.webp"
                  alt="Picture of the author"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">
                  Arq. Gladys Hishikawa Migita
                </h3>
                <p className="text-black">
                  Titulada de la Facultad de Arquitectura y Urbanismo de la
                  Universidad Ricardo Palma, (Lima – Perú) en 1986. Luego de una
                  experiencia de una Beca Técnica de arquitectura en Japón,
                  entre 1988 y 1989, regresa al Perú para ejercer la profesión
                  desde el año 1990, dedicándose al desarrollo de proyectos
                  arquitectónicos diversos. En 1991 se introduce en el campo de
                  proyectos de arquitectura hospitalaria en el ámbito privado, y
                  desde el 2007, en hospitales para el Estado Peruano,
                  participando así mismo en la Gerencia de Proyectos. Funda la
                  empresa Q Pro en 2012 para seguir ofreciendo proyectos
                  integrales de calidad arquitectónica en diversos ámbitos como
                  los de salud, vivienda, institucionales y otros.
                  Paralelamente, ejerce la docencia en una reconocida
                  universidad privada del Perú.
                </p>
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-4">
              <div className="w-full aspect-square md:h-[700px] relative">
                <Image
                  src="/IMAG0506.webp"
                  alt="Picture of the author"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">
                  Arq. Bruno Rottier Pérez-Albela
                </h3>
                <p className="text-black">
                  Titulado de la Facultad de Arquitectura de la Universidad San
                  Martín de Porres, (Lima -Perú) en 2008. Forma parte de la
                  empresa Q Pro desde el 2012 participando en el desarrollo de
                  diversos proyectos arquitectónicos.
                </p>
              </div>
            </div>
            s
          </div>
        </div>
      </PageContent>
    </>
  );
}
