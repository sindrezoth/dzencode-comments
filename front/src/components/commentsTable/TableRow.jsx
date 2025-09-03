import { useNavigate } from "react-router";

const TableRow = ({ commentData, i, pageNum }) => {
  const navigate = useNavigate();
  const { commentId, username, email, createdAt, updatedAt } = commentData;
  return (
    <tr
      key={`table-row-${pageNum}-${i}`}
      onClick={() => navigate("/comment/" + commentId)}
    >
      <th>{commentId}</th>
      <td>{username}</td>
      <td>{email}</td>
      <td>{createdAt}</td>
      <td>{updatedAt}</td>
    </tr>
  );
};

export default TableRow;
