import { request } from "@strapi/helper-plugin";

export async function upload(data) {
  await request("/strapi-seed/upload", { method: "POST", body: data });
}

export async function getContentTypes() {
  const res = await request("/strapi-seed/content-types", { method: "GET" });
  return res;
}

export async function findSeed(data) {
  const res = await request("/strapi-seed/find-seed", {
    method: "POST",
    body: data,
  });
  return res;
}

export async function seedModel(data) {
  const res = await request("/strapi-seed/seed", {
    method: "POST",
    body: data,
  });
  return res;
}
