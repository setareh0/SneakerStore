export const urls = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
  },
  user: "/user",
  sneaker: {
    list: "/sneaker",
    sneakerItems: (id) => `/sneaker/item/${id}`,
    sneakerBrands: "/sneaker/brands",
  },
};
