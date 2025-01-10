import { useState } from "react";
import ReactQuill from "react-quill";

const ReactQuillTemplate = (props) => {
  const [quillValue, setQuillValue] = useState("");

  const handleQuillChange = (content, delta, source, editor) => {
    setQuillValue(editor.getContents());
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"],
    ],
  };

  return (
    <>
      <div>
        <ReactQuill
          style={{ height: "600px" }}
          theme="snow"
          modules={modules}
          formats={formats}
          value={quillValue || ""}
          onChange={handleQuillChange}
        />
      </div>
    </>
  );
};
export default ReactQuillTemplate;
