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

const TableHead = ({ pageNum, handleSort, getSortSymbol }) => {
  return (
    <thead>
      <tr>
        {theadList.map((n, i) =>
          !i ? (
            <th
              key={`thead-th-${pageNum}-${i}`}
              id={n.id}
              onClick={() => handleSort(n.id)}
            >
              {`${n.name} ${getSortSymbol(n.id)}`}
            </th>
          ) : (
            <td
              key={`thead-td-${pageNum}-${i}`}
              id={n.id}
              onClick={() => handleSort(n.id)}
            >
              {`${n.name} ${getSortSymbol(n.id)}`}
            </td>
          ),
        )}
      </tr>
    </thead>
  );
};

export default TableHead;
