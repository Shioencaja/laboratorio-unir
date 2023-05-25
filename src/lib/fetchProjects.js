import groq from "groq";
import client from "../../client";

export async function getAllProjects() {
  const query = groq`
  *[_type == "post"]| order(featured desc, createdAt desc){
    title,
    "image": mainImage.asset ->{
      url,
      "height": metadata.dimensions.height,
      "width": metadata.dimensions.width
    },
    "slug": slug.current,
    "category": categories->title,
    "gallery": gallery[0].asset->{
      url,
      "height": metadata.dimensions.height,
      "width": metadata.dimensions.width
    },
    "year": createdAt,
    location,
    area,
    featured    
  }
  `;

  const projects = await client.fetch(query);

  return projects;
}
