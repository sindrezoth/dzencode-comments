import { useParams } from "react-router";

const LinkToOutside = () => {
  const { url } = useParams();
  return (
    <div className="link-to">
      <p>
        Ви покидаєте цей сайт!</p> 
      <p>Натисніть{" "}
        <a href={url} target="_blank">
          сюди
        </a>{" "}
        щоб перейти за посиланням ({url}).
      </p>

    </div>
  );
};

export default LinkToOutside;
