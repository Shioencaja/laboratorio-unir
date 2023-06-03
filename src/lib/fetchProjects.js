import groq from "groq";
import client from "../../client";

export async function getProjectPaths() {
  const query = groq`
  *[_type == "projects"]{
    "slug": slug.current,
  }
  `;
  const projects = await client.fetch(query);
  return projects;
}

export async function getAllProjects(locale, category) {
  const query = groq`
  *[_type == "projects" && categories->slug.current == "${category}"]| order(featured desc, createdAt desc){
    "title": titulo.${locale},
    "slug": slug.current,
    "icon": icon.asset->{
      url,
      "height": metadata.dimensions.height,
      "width": metadata.dimensions.width
    },
    "mainImage": mainImage.asset->{
      url,
      "height": metadata.dimensions.height,
      "width": metadata.dimensions.width
    },
    featured,
    "category": categories->slug.current,
  }
  `;

  const projects = await client.fetch(query);

  return projects;
}

export async function getSingleProject(locale, slug) {
  const query = groq`
  *[_type == "projects" && slug.current == "${slug}"]{
    "title": titulo.${locale},
    "slug": slug.current,
    "icon": icon.asset->{
      url,
      "height": metadata.dimensions.height,
      "width": metadata.dimensions.width
    },
    "slug": slug.current,
    "category": categories->{title, "slug": slug.current},
    "gallery": gallery[].asset->{
      url,
      "height": metadata.dimensions.height,
      "width": metadata.dimensions.width
    },
    "concept": concept[].asset->{
      url,
      "height": metadata.dimensions.height,
      "width": metadata.dimensions.width
    },
    "year": createdAt,
    location,
    area,
    "body": body.${locale},
  }
  `;

  const project = await client.fetch(query);
  const solo = project[0];
  return solo;
}
