import CodeBlock from "./CodeBlock";

function replaceNewLines(text) {
  return text
    .replaceAll(/\n{2,}/g, "\n\n")
    .split("\n")
    .map((t, i, arr) => (arr.length - 1 !== i ? [t, <br />] : t));
}

function em(text) {
  return <em>{text}</em>;
}

function strong(text) {
  return <strong>{text}</strong>;
}

function a(href, text) {
  return (
    <a
      target="_blank"
      href={
        window.location.origin +
        "/linkto/" +
        (href.includes("http")
          ? href.replaceAll("/", "%2f")
          : "https:%2f%2f" + href.replaceAll("/", "%2f"))
      }
    >
      {text}
    </a>
  );
}

function createDOM(commentParts) {
  function recur(cp) {
    const result = cp.map((p) => {
      if (p.tag) {
        if (p.tag === "i") {
          return p.innerParts
            ? em(recur(p.innerParts))
            : em(replaceNewLines(p.enclose));
        } else if (p.tag === "b") {
          return p.innerParts
            ? strong(recur(p.innerParts))
            : strong(replaceNewLines(p.enclose));
        } else if (p.tag === "c") {
          if (p.text.includes("\n")) {
            console.log("BLOCK");
            return <CodeBlock code={p.enclose} />;
          } else {
            console.log("INLINE");
            return (
              <pre className="inline-code">
                <code>{p.enclose}</code>
              </pre>
            );
          }
        } else {
          return a(p.text.match(/("|')(.*)(\1)/)[2], p.enclose);
        }
      } else {
        return replaceNewLines(p.text);
      }
    });

    return result;
  }

  return recur(commentParts);
}

const FormattedComment = ({ commentParts }) => {
  return createDOM(commentParts);
};

export default FormattedComment;
