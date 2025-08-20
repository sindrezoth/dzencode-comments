const CommentsTable = () => {
  const comments = [
    {
      commentId: 1,
      username: "John",
      email: "john@hey.com",
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
    },
    {
      commentId: 2,
      username: "Done",
      email: "done@hey.com",
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
    },
    {
      commentId: 3,
      username: "Hey",
      email: "yo@hey.com",
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
    },
    {
      commentId: 4,
      username: "Zoth",
      email: "zoth@hey.com",
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
    },
    {
      commentId: 5,
      username: "Somany",
      email: "so@many.com",
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
    },
  ];
  //△
  //▲
  //▽
  //▼
  return (
    <>
      <div className="table-wrapper">
        <table>
          <thead>
            <th>comment ID</th>
            <td>username</td>
            <td>email</td>
            <td>created at ▲</td>
            <td>updated at</td>
          </thead>
          <tbody>
            {comments.map(
              ({ commentId, username, email, createdAt, updatedAt }) => (
                <tr>
                  <th>{commentId}</th>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{createdAt}</td>
                  <td>{updatedAt}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>

      <div className="table-controls">1 prev 4 5 6 next last</div>
    </>
  );
};

export default CommentsTable;
