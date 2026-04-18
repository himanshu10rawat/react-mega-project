import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import storeService from "../../appwriteServices/store-service";
import blogService from "../../appwriteServices/blog-service";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, updatedBlog } from "../../store/blogSlice";
import { serializePost } from "../../utils/serializePost";
import { useToast } from "../../context/ToastContext";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer.userData);
  const { showToast } = useToast();

  // State for error handling and loading
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const submit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      if (post) {
        // UPDATE POST FLOW
        let fileId = post.featuredImage;

        // Handle image upload if provided
        if (data.image?.[0]) {
          try {
            const file = await storeService.uploadFile(data.image[0]);
            if (!file) {
              throw new Error("File upload failed - no file returned");
            }
            fileId = file.$id;

            // Delete old image only if new one uploaded successfully
            if (post.featuredImage) {
              try {
                await storeService.deleteFile(post.featuredImage);
              } catch (deleteError) {
                // Silently ignore deletion errors
              }
            }
          } catch (fileError) {
            throw new Error(
              `Image upload failed: ${fileError.message || "Unknown error"}`,
            );
          }
        }

        const dbPost = await blogService.updatePost(post.$id, {
          ...data,
          featuredImage: fileId,
        });

        if (dbPost) {
          dispatch(updatedBlog(serializePost(dbPost)));
          showToast("Post updated successfully!", "success");
          navigate(`/post/${dbPost.$id}`);
        } else {
          throw new Error("Failed to update post on server");
        }
      } else {
        // CREATE NEW POST FLOW
        if (!data.image?.[0]) {
          throw new Error("Featured image is required for new posts");
        }

        let file;
        try {
          file = await storeService.uploadFile(data.image[0]);
          if (!file) {
            throw new Error("File upload failed - no file returned");
          }
        } catch (fileError) {
          throw new Error(
            `Image upload failed: ${fileError.message || "Unknown error"}`,
          );
        }

        const dbPost = await blogService.createPost({
          ...data,
          featuredImage: file.$id,
          userId: userData.$id,
        });

        if (!dbPost) {
          throw new Error("Failed to create blog post on server");
        }

        dispatch(addBlog(serializePost(dbPost)));
        showToast("Post published successfully!", "success");
        navigate(`/post/${dbPost.$id}`);
      }
    } catch (error) {
      const errorMessage =
        error.message || "An unexpected error occurred. Please try again.";
      setSubmitError(errorMessage);
      showToast(errorMessage, "error", 5000); // 5 second duration for errors
    } finally {
      setIsSubmitting(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
    >
      <div className="col-span-1 lg:col-span-2 space-y-6">
        <Input
          label="Title"
          placeholder="Enter post title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug"
          placeholder="auto-generated slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <RTE name="content" control={control} label="Content" />
      </div>

      <div className="col-span-1 space-y-6">
        <div className="card-base p-4 md:p-6 lg:sticky lg:top-24 space-y-6">
          <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
            disabled={isSubmitting}
          />

          {post && (
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src={storeService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full h-40 md:h-48 object-cover"
              />
            </div>
          )}

          <Select
            options={["active", "inactive"]}
            label="Status"
            {...register("status", { required: true })}
            disabled={isSubmitting}
          />

          {/* Error Message Display */}
          {submitError && (
            <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-lg">⚠️</span>
                <div>
                  <p className="font-semibold">Error</p>
                  <p>{submitError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button with Loading State */}
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {post ? "Updating..." : "Publishing..."}
              </span>
            ) : post ? (
              "Update Post"
            ) : (
              "Publish Post"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
