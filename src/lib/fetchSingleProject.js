import groq from "groq";
import client from "../../client";

export async function getSingleProject(slug) {
  const query = groq`
  *[_type == "post" && slug.current == "${slug}"]{
    title,
    "image": mainImage.asset->{
      url,
      "height": metadata.dimensions.height,
      "width": metadata.dimensions.width
    },
    "slug": slug.current,
    "category": categories->title,
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
    body,
  }
  `;

  const project = await client.fetch(query);

  const solo = project[0];

  return solo;
}
