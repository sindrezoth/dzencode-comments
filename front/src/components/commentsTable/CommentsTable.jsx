import axios from "axios";
import { useEffect, useState } from "react";
import TableControls from "./TableControls";
import { useParams, useSearchParams, useNavigate } from "react-router";

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
    total: null,
  });
  const [entitiesPerPage, setEntitiesPerPage] = useState(25);

  const { page: pageNum } = useParams();
  // const sp = useSearchParams();
  // console.log(sp[0].entries().next());

  useEffect(() => {
    if(!isNaN(pageNum)) {
      setPage(prev => ({...prev, current: +pageNum}));
    }
  }, [pageNum]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getAll() {
      const res = await axios.get("/api/comments");
      if (res.data) {
        setComments(res.data);
        setPage({
          current: +pageNum || 1,
          total: Math.ceil(res.data.length / entitiesPerPage),
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
    const toPage = p < 1 ? 1 : p > page.total ? page.total : p;
    navigate("/comments-table/" + toPage);
  }

  function prepareListToRender() {
    return comments
      .sort(({ [sortBy.name]: a }, { [sortBy.name]: b }) => {
        if (isNaN(+a) && typeof a === "string") {
          if (sortBy.asc) {
            return b.toLowerCase().localeCompare(a.toLowerCase());
          }
          return a.toLowerCase().localeCompare(b.toLowerCase());
        }
        return sortBy.asc ? a - b : b - a;
      })
      .slice(
        entitiesPerPage * (page.current - 1),
        entitiesPerPage * page.current,
      );
  }

  return (
    <>
      {comments && comments.length ? (
        <>
          <TableControls page={page} toPage={toPage} />
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {theadList.map((n, i) =>
                    !i ? (
                      <th key={`thead-th-${pageNum}-${i}`} id={n.id} onClick={() => handleSort(n.id)}>
                        {`${n.name} ${getSortSymbol(n.id)}`}
                      </th>
                    ) : (
                      <td key={`thead-td-${pageNum}-${i}`} id={n.id} onClick={() => handleSort(n.id)}>
                        {`${n.name} ${getSortSymbol(n.id)}`}
                      </td>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {
                  prepareListToRender()
                  .map(
                    ({ commentId, username, email, createdAt, updatedAt }, i) => (
                      <tr key={`table-row-${pageNum}-${i}`} onClick={() => navigate("/comment/" + commentId)}>
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
          <TableControls page={page} toPage={toPage} />
        </>
      ) : (
        <p>Loading... </p>
      )}
    </>
  );
};

export default CommentsTable;
