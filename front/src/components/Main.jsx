import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";
import DialogForm from "./DialogForm";
import Login from "./Login";
import SignDialog from "./account/SignDialog";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

const Main = () => {
  const { data, loading, error } = useFetch("http://localhost:3000");

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(loading);
  }, [loading])

  useEffect(() => {
    console.log(error);
  }, [error])
  return (
    <main>
      {data && <p>{data.message}</p>}
      {loading && <p>loading...</p>}
      {error && <p>error!</p>}
      <SignDialog />
      {/* <Login /> */}
      {/* <DialogForm header="Увійти в акаунт" footer="або зареєструйся"> */}
      {/*   <h1>HEEELLOOO</h1> */}
      {/*   <h2>hey</h2> */}
      {/* </DialogForm> */}
      {/* <CommentsList /> */}
      {/* <NewCommentForm /> */}
    </main>
  );
};

export default Main;
