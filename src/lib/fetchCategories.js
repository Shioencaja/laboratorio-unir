import groq from "groq";
import client from "../../client";

export async function getAllCategories() {
  const query = groq`
  *[_type == "category"]{
    title,
    description,
      featured,
    "image": image.asset->{
      url,
      "height": metadata.dimensions.height,
      "width": metadata.dimensions.width
    },
    "secondaryImage": secondaryImage.asset->{
      url,
      "height": metadata.dimensions.height,
      "width": metadata.dimensions.width
    }
  }| order(featured asc)
  `;

  const projects = await client.fetch(query);

  return projects;
}

export async function getCategoriesNames() {
  const query = groq`
  *[_type == "category"]{
    title
  }
  `;

  const categories = await client.fetch(query);
  return categories;
}
