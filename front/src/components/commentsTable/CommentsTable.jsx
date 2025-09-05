import axios from "axios";
import { useEffect, useState } from "react";
import TableControls from "./TableControls";
import { useParams, useSearchParams, useNavigate, Link } from "react-router";
import TableRow from "./TableRow";
import TableHead from "./TableHead";
import GenerateDataForm from "../GenerateDataForm";

const CommentsTable = () => {
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState({
    current: null,
    total: null,
  });
  const [entitiesPerPage, setEntitiesPerPage] = useState(25);
  const navigate = useNavigate();

  const { page: pageNum } = useParams();

  let sortByQuery, ascQuery;
  const params = useSearchParams()[0];

  for (let [attr, val] of params) {
    if (attr === "sortBy") {
      sortByQuery = val;
    }
    if (attr === "asc") {
      ascQuery = val;
    }
  }

  const [sortBy, setSortBy] = useState({
    name: sortByQuery || "createdAt",
    asc: ascQuery || true,
  });

  if (!params) {
    navigate(
      `/comments-table/${page.current}?sortBy=${sortBy.name}&asc=${sortBy.asc}`,
    );
  }

  useEffect(() => {
    if (!isNaN(pageNum)) {
      setPage((prev) => ({ ...prev, current: +pageNum }));
    }
  }, [pageNum]);

  useEffect(() => {
    async function getAll() {
      try {
        const res = await axios.get("/api/comments?withReplyTo=0");
        if (res.data) {
          setComments(res.data);
          setPage({
            current: +pageNum || 1,
            total: Math.ceil(res.data.length / entitiesPerPage),
          });
        }
      } catch (err) {
        if (err.status === 404) {
          setError("Коментарі відсутні.");
        }
      }
    }
    getAll();
  }, []);

  function handleSort(colName) {
    let asc;
    if (sortBy.name === colName) {
      asc = !sortBy.asc;
      setSortBy((prev) => ({ ...prev, asc: !prev.asc }));
    } else {
      asc = ["createdAt", "updatedAt"].includes(colName) ? true : false;
      setSortBy({
        name: colName,
        asc: ["createdAt", "updatedAt"].includes(colName) ? true : false,
      });
    }

    navigate(`/comments-table/${page.current}?sortBy=${colName}&asc=${asc}`);
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
        return sortBy.asc ? b - a : a - b;
      })
      .slice(
        entitiesPerPage * (page.current - 1),
        entitiesPerPage * page.current,
      );
  }

  return (
    <>
      {error ? (
        <>
          <p style={{ fontSize: "1.5em" }}>{error}</p>
          <Link to={"/generate"}>Перейти на сторінку генерації даних</Link>
        </>
      ) : comments && comments.length ? (
        <>
          <TableControls page={page} toPage={toPage} />
          <div className="table-wrapper">
            <table>
              <TableHead
                pageNum={pageNum}
                handleSort={handleSort}
                getSortSymbol={getSortSymbol}
              />
              <tbody>
                {prepareListToRender().map((commentData, i) => (
                  <TableRow commentData={commentData} i={i} pageNum={pageNum} />
                ))}
              </tbody>
            </table>
          </div>
          <TableControls page={page} toPage={toPage} />
        </>
      ) : (
        <p style={{ fontSize: "1.5em" }}>Loading... </p>
      )}
    </>
  );
};

export default CommentsTable;
