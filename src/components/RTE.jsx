import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../config/config";

export default function RTE({ name, control, label }) {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-2 pl-2 text-sm font-semibold text-gray-200">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field }) => (
          <div className="rounded-xl overflow-hidden shadow-lg">
            <Editor
              apiKey={config.tinyApiKey}
              value={field.value}
              onEditorChange={field.onChange}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>
        )}
      />
    </div>
  );
}
