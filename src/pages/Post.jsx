import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import storeService from "../appwriteServices/store-service";
import blogService from "../appwriteServices/blog-service";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../store/blogSlice";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.authReducer.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      blogService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    blogService.deletePost(post.$id).then((status) => {
      if (status) {
        dispatch(deleteBlog(post.$id));
        storeService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return post ? (
    <div className="min-h-screen bg-gray-950 w-full">
      {/* Hero Section with Featured Image - Full Width */}
      <div className="relative h-60 sm:h-80 md:h-96 lg:h-120 w-full overflow-hidden">
        <img
          src={storeService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/50 to-transparent"></div>
      </div>

      {/* Main Content - Full Width */}
      <div className="w-full bg-gray-950">
        <div className="w-full px-3 sm:px-4 md:px-8 lg:px-16 py-8 md:py-12">
          {/* Header Section */}
          <div className="mb-8 md:mb-12">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-400 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-medium">
                  📅 {formatDate(post.$createdAt || new Date())}
                </span>
              </div>
              {post.$updatedAt && post.$updatedAt !== post.$createdAt && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    Updated {formatDate(post.$updatedAt)}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {isAuthor && (
              <div className="flex flex-wrap gap-2 md:gap-3">
                <Button
                  onClick={() => navigate(`/edit-post/${post.$id}`)}
                  variant="primary"
                  className="flex items-center gap-2 text-xs md:text-sm"
                >
                  ✏️ Edit Post
                </Button>
                <Button
                  variant="secondary"
                  onClick={deletePost}
                  className="flex items-center gap-2 text-red-400 border-red-400 hover:bg-red-950 hover:border-red-300 text-xs md:text-sm"
                >
                  🗑️ Delete Post
                </Button>
              </div>
            )}
          </div>

          {/* Blog Content */}
          <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 mb-8 md:mb-12 shadow-xl">
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-gray-900">
              {parse(post.content)}
            </div>
          </div>

          {/* Footer Section */}
          <div className="border-t border-gray-700 pt-6 md:pt-8">
            <Button
              onClick={() => navigate("/")}
              variant="secondary"
              className="inline-flex items-center gap-2 text-xs md:text-sm"
            >
              ← Back to Posts
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
