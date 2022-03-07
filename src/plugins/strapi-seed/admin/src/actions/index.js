import { request } from "@strapi/helper-plugin";

export async function upload(data) {
  //console.log(data.fileData);

  try {
    await JSON.parse(data.fileData);
    const res = await request("/strapi-seed/upload", {
      method: "POST",
      body: data,
    });
    if (res.error) {
      throw res.error;
    }
    return res;
  } catch (e) {
    return { error: e };
  }
}

export async function getContentTypes() {
  const res = await request("/strapi-seed/content-types", { method: "GET" });
  return res;
}

export async function findSeed(data) {
  try {
    const res = await request("/strapi-seed/find-seed", {
      method: "POST",
      body: data,
    });

    if (res.error) {
      throw res.error;
    }
    return res;
  } catch (e) {
    return { error: e };
  }
}

export async function seedModel(data) {
  try {
    const res = await request("/strapi-seed/seed", {
      method: "POST",
      body: data,
    });
    return res;
  } catch (e) {
    console.log(e);
    return { error: e };
  }
}
