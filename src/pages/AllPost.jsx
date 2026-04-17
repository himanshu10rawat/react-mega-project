import { useState, useEffect } from "react";
import { Container, PostCard, SkeletonCard } from "../components";
import blogService from "../appwriteServices/blog-service";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const getPosts = await blogService.getPostList([]);
        if (getPosts) {
          setPosts(getPosts.rows);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8 md:py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {Array(8)
              .fill("")
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 md:py-20 flex items-center">
        <Container>
          <div className="text-center px-4">
            <div className="text-4xl md:text-5xl mb-4">📝</div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              No Posts Yet
            </h1>
            <p className="text-sm md:text-base text-gray-400">
              Be the first to create a post 🚀
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 md:py-12 lg:py-16">
      <Container>
        <div className="mb-6 md:mb-8 px-2">
          <h1 className="text-2xl md:text-4xl font-bold bg-linear-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
            All Posts
          </h1>
          <div className="h-1 w-24 bg-linear-to-r from-purple-600 to-violet-600 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="transform transition-all duration-300 hover:-translate-y-2"
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPost;
