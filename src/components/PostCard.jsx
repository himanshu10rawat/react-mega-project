import storeService from "../appwriteServices/store-service";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const { $id, featuredImage, title } = post;
  return (
    <Link to={`/post/${$id}`}>
      <div className="card-base group cursor-pointer h-full flex flex-col">
        <div className="relative overflow-hidden h-48 bg-linear-to-br from-purple-200 to-violet-200">
          <img
            src={storeService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <h2 className="text-lg font-bold text-gray-900 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-600 group-hover:to-violet-600 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
            {title}
          </h2>
          <div className="mt-3 text-sm text-gray-500 group-hover:text-purple-600 font-medium transition-colors duration-300">
            Read More →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
