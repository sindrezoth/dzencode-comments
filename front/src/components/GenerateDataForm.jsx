import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const GenerateDataForm = () => {
  const [usersCount, setUsersCount] = useState(100);
  const [commentsCount, setCommentsCount] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    if (!usersCount && !commentsCount) {
      setError(
        "Порожня форма. Потрібні хоча б один коментар або один користувач.",
      );
      return;
    }

    setIsLoading(true);
    try {
      const result = await axios("/api/generate/all", {
        method: "post",
        data: {
          usersCount,
          commentsCount,
        },
      });

      console.log(result);
      if (result.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
          console.log("navigate?");
        }, 2000);
      }
      setError(null);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      console.log(err);
    }
  }

  return (
    <div className="generate-data-form">
      {isLoading && <p>Зачекайте будь ласка</p>}
      {!isLoading && !success && (
        <form onSubmit={submitHandler}>
          <p>
            <button type="submit">Натисніть</button> щоб згенерувати
            користувачів і коментарі
          </p>
          <label htmlFor="usersinput">Кількість користувачів</label>
          <input
            type="number"
            id="usersinput"
            max="1000"
            min="0"
            value={usersCount}
            onChange={(e) => setUsersCount(e.target.valueAsNumber)}
          />
          <label htmlFor="commentsinput">Кількість коментарів</label>
          <input
            type="number"
            id="commentsinput"
            max="1000"
            min="0"
            value={commentsCount}
            onChange={(e) => setCommentsCount(e.target.valueAsNumber)}
          />
        </form>
      )}
      {success && (
        <>
          <p>Дані успішно згенеровані!</p>
        </>
      )}
      {error && (
        <>
          <p>Виникла полмилка: </p>
          <p>{error}</p>
        </>
      )}
    </div>
  );
};

export default GenerateDataForm;
