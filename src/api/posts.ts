import { makeApiCall, makeApiInfoCall } from "./rest_util";


export type Post = Partial<{
  id: number
  title: string
  author: string
  content: string
  modified: string
  date: string
}>


export async function getRecentPosts(){
  return await makeApiCall("/wp-json/api/v1/posts", {
    type: "recent",
  }).then(res => res.json());
}

export async function getAllPosts(): Promise<Post[]> {
  return await makeApiCall("/wp-json/api/v1/posts", {
    type: "all",
  }).then(res => res.json());
}

export async function getPost(id: number): Promise<Post> {
  return await makeApiCall("/wp-json/api/v1/posts", {
    "type": "retrieve",
    "id": id,
  }).then(
    res => res.json()
  );
}