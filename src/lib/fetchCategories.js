import groq from "groq";
import client from "../../client";

export async function getAllCategories(locale) {
  const query = groq`
  *[_type == "category"]{
    "title": titulo.${locale},
    "slug": slug.current,
    featured,
    "icon": icon.asset->{
      url,
      "height": metadata.dimensions.height,
      "width": metadata.dimensions.width
    },
    "mainImage": mainImage.asset->{
      url,
      "height": metadata.dimensions.height,
      "width": metadata.dimensions.width
    }
  }| order(featured asc)
  `;

  const projects = await client.fetch(query);

  return projects;
}

export async function getCategoriesNavBar(locale) {
  const query = groq`
  *[_type == "category"]{
    "slug": slug.current,
    "title": titulo.${locale},
    featured,
  }| order(featured asc)
  `;

  const categories = await client.fetch(query);
  return categories;
}

export async function getCategory(locale, category) {
  const query = groq`
  *[_type == "category" && slug.current == "${category}"]{
    "title": titulo.${locale},
    "slug": slug.current,
    featured,
    "icon": icon.asset->{
      url,
      "height": metadata.dimensions.height,
      "width": metadata.dimensions.width
    }
  }
  `;
  const categoryData = await client.fetch(query);
  return categoryData;
}
