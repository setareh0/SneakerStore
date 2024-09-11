import { httpClient } from "../client";
import { urls } from "../urls";

export async function getSneakers(params) {
  const response = await httpClient().get(urls.sneaker.list, {
    params: {
      page: params.page,
      limit: params.limit,
      brands: params.brands,
      search: params.search,
    },
  });
  return response.data;
}

export async function getSneakerBrands() {
  const response = await httpClient().get(urls.sneaker.sneakerBrands);
  return response.data;
}

export async function getSneakerItems(id) {
  const response = await httpClient().get(urls.sneaker.sneakerItems(id));
  return response.data;
}
