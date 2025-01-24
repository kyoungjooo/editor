import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
Quill.register("modules/ImageResize", ImageResize);
import styled from "@emotion/styled";
import axios from "axios";

function ReactQuillEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const quillRef = useRef(null);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["link", "image"],
          [{ align: [] }, { color: [] }, { background: [] }],
          ["clean"],
        ],
        handlers: {
          image: ImageHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
    }),
    []
  );

  const handleTitleChange = (e) => {
    setTitle(e.currentTarget.value);
    console.log(title);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제목", title);
    console.log("전송", content);
  };
  const onChagecontent = (e) => {
    console.log(e);
    setContent(e);
  };

  function ImageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;
      if (file) {
        console.log(quillRef);
        console.log("Selected file:", file);
        const formData = new FormData();
        formData.append("profile", file);
        console.log(formData);
        /*에디터 정보를 가져온다.*/
        let quillObj = quillRef.current?.getEditor();
        const range = quillObj?.getSelection();
        try {
          /*서버에다가 정보를 보내준 다음 서버에서 보낸 url을 imgUrl로 받는다.*/
          const res = await axios.post("api주소", formData);
          const imgUrl = res.data;
          /*에디터의 커서 위치에 이미지 요소를 넣어준다.*/
          quillObj?.insertEmbed(range.index, "image", `${imgUrl}`);
        } catch (error) {
          return error;
        }
      }
    };
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" name="title" onChange={handleTitleChange}></input>
        <ReactQuill
          ref={quillRef}
          style={{ width: "800px", height: "600px" }}
          modules={modules}
          onChange={onChagecontent}
        />
      </div>
      <Button type="submit">입력완료</Button>
    </form>
  );
}
export default ReactQuillEditor;

const Button = styled.button`
  position: absolute;
  bottom: 0;
`;
