import { useEffect, useRef } from "react";

const Paragraph = ({ content }) => {
  const formattedRef = useRef(null);
  useEffect(() => {
    if (formattedRef.current && content) {
      const prepare = content
        .replaceAll(/^(<br>){1}/g, "")
        .replaceAll(/^(<br>){2,}/g, "<br>")
        .replaceAll(/(<br>){2,}/g, "<br><br>");

      // console.log(prepare.match(/<a.*"(.*)".*\/a>/));

      formattedRef.current.innerHTML = prepare;
    }
  }, [content]);

  return (
    <p
      style={{
        whiteSpace: "pre-wrap",
        overflowY: "scroll",
        fontSize: "1rem",
      }}
      ref={formattedRef}
    ></p>
  );
};

export default Paragraph;
