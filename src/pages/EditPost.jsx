import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import blogService from "../appwriteServices/blog-service";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (slug) {
        const postGet = await blogService.getPost(slug);
        if (postGet) setPost(postGet);
      } else {
        navigate("/");
      }
    })();
  }, [slug, navigate]);

  return post ? (
    <div className="py-8 md:py-12 lg:py-16 px-2">
      <Container>
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold bg-linear-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
            Edit Post
          </h1>
          <div className="h-1 w-24 bg-linear-to-r from-purple-600 to-violet-600 rounded-full"></div>
        </div>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
