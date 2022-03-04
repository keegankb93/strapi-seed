import { request } from '@strapi/helper-plugin';

export async function upload(data) {
  console.log(data)
  await request('/strapi-seed/upload', { method: 'POST', body: data })
}