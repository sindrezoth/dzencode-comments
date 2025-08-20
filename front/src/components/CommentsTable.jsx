import axios from "axios";
import { useEffect, useState } from "react";
import TableControls from "./TableControls";

const theadList = [
  {
    id: "commentId",
    name: "comment ID",
  },
  {
    id: "username",
    name: "username",
  },
  {
    id: "email",
    name: "email",
  },
  {
    id: "createdAt",
    name: "createdat",
  },
  {
    id: "updatedAt",
    name: "updated at",
  },
];

const CommentsTable = () => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState({
    current: null,
    total: null
  });
  const [entitiesPerPage, setEntitiesPerPage] = useState(25);

  useEffect(() => {
    async function getAll () {
      const res = await axios.get("/api/comments");
      if(res.data) {
        setComments(res.data.comments);
        setPage({
          current: 1,
          total: Math.ceil(res.data.comments.length / entitiesPerPage)
        });
      }
    }
    getAll();
  }, []);

  const [sortBy, setSortBy] = useState({
    name: "createdAt",
    asc: false,
  });

  function handleSort(colName) {
    if (sortBy.name === colName) {
      setSortBy((prev) => ({ ...prev, asc: !prev.asc }));
    } else {
      setSortBy({
        name: colName,
        asc: false,
      });
    }
  }

  function getSortSymbol(colName) {
    //△▽▲▼
    // \u00A0

    if (sortBy.name !== colName) return "\u00A0";

    return sortBy.asc ? "▼" : "▲";
  }

  function toPage(p) {
    setPage(prev => ({...prev, current: p < 1 ? 1 : p > page.total ? page.total : p}));
  }

  return (
    <>{
      comments && comments.length ? <>

          <TableControls page={page} toPage={toPage} />
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {theadList.map((n, i) =>
                  !i ? (
                    <th id={n.id} onClick={(e) => handleSort(n.id)}>
                      {`${n.name} ${getSortSymbol(n.id)}`}
                    </th>
                  ) : (
                      <td id={n.id} onClick={(e) => handleSort(n.id)}>
                        {`${n.name} ${getSortSymbol(n.id)}`}
                      </td>
                    ),
                )}
              </tr>
            </thead>
            <tbody>
              {comments
                .sort(({ [sortBy.name]: a }, { [sortBy.name]: b }) => {
                  if (isNaN(+a) && typeof a === "string") {
                    if (sortBy.asc) {
                      return b.toLowerCase().localeCompare(a.toLowerCase());
                    }
                    return a.toLowerCase().localeCompare(b.toLowerCase());
                  }
                  return sortBy.asc ? a - b : b - a;
                })
                .slice(entitiesPerPage * (page.current-1), entitiesPerPage * page.current)
                .map(({ commentId, username, email, createdAt, updatedAt }) => (
                  <tr>
                    <th>{commentId}</th>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{createdAt}</td>
                    <td>{updatedAt}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <TableControls page={page} toPage={toPage} />
        </div>
      </>
        : 
        <p>Loading... </p>
    }</>
  );
};

export default CommentsTable;
