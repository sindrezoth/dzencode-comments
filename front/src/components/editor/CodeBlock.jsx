import hljs from "highlight.js/lib/common";
import "highlight.js/styles/github.css";
import "highlight.js/styles/github.css";

const CodeBlock = ({ code, language }) => {
  let { value: highlighted, language: languageAuto } = hljs.highlightAuto(
    code.replaceAll(/<br>/g, "\n"),
  );

  const display = (language + code).includes("<br>") ? "block" : "inline";

  return (
    <div className={`formatted-code ${display}`}>
      {language && (
        <span className="code-language">
          {language !== "<br>" && language.length
            ? language.replace(/<br>/, "\n")
            : languageAuto}
        </span>
      )}
      <pre>
        {language && language.length ? (
          <code
            spellCheck={false}
            className={`language-${language.replace(/<br>/, "")}`}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          ></code>
        ) : (
          <code
            spellCheck={false}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          ></code>
        )}
      </pre>
    </div>
  );
};

export default CodeBlock;
