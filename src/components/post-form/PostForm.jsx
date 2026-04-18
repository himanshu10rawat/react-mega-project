import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import storeService from "../../appwriteServices/store-service";
import blogService from "../../appwriteServices/blog-service";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, updatedBlog } from "../../store/blogSlice";

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

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await storeService.uploadFile(data.image[0])
        : null;

      if (file) {
        storeService.deleteFile(post.featuredImage);
      }

      const dbPost = await blogService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        dispatch(updatedBlog(dbPost));
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await storeService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;

        const dbPost = await blogService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          dispatch(addBlog(dbPost));
          navigate(`/post/${dbPost.$id}`);
        }
      }
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
          />

          <Button type="submit" variant="primary" className="w-full">
            {post ? "Update Post" : "Publish Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}
