export default async ({ store, redirect, route }) => {
  // if (process.client) {
  await store.restored;
  const urlRequiresAuth = /^\/panel(\/|$)/.test(route.fullPath);
  if (urlRequiresAuth && !store.getters["Auth/isUserAuthenticated"]) {
    redirect("/login");
  }
  // }
};
