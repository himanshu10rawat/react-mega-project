/**
 * Serializes Appwrite post object to remove non-serializable functions
 * This prevents Redux DevTools warnings about non-serializable values
 */
export const serializePost = (post) => {
  if (!post) return null;

  return {
    $id: post.$id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    featuredImage: post.featuredImage,
    status: post.status,
    userId: post.userId,
    $createdAt: post.$createdAt,
    $updatedAt: post.$updatedAt,
  };
};

/**
 * Serializes array of posts
 */
export const serializePostList = (posts) => {
  if (!posts || !Array.isArray(posts)) return [];
  return posts.map((post) => serializePost(post));
};
