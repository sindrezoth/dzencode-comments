const TableControls = ({ page, toPage }) => {
  const numberButtons = [];
  const firsts = [1, 2, 3];
  const currents = [page.current - 1, page.current, page.current + 1].filter(
    (c) => c > 0 && c < page.total + 1,
  );
  const lasts = [page.total - 2, page.total - 1, page.total];

  const firstsSet = new Set(firsts);
  const lastsSet = new Set(lasts);

  if (firsts.some((f) => currents.includes(f))) {
    currents.forEach((c) => firstsSet.add(c));
  } else if (lasts.some((f) => currents.includes(f))) {
    currents.forEach((c) => lastsSet.add(c));
  } else {
    numberButtons[1] = [...currents];
  }

  numberButtons[0] = [...firstsSet];
  numberButtons.push([...lastsSet]);

  return (
    <div className="table-controls">
      <button
        type="button"
        disabled={page.current === 1}
        onClick={() => toPage(page.current - 1)}
      >
        prev
      </button>
      <div className="table-numbers-pages">
        {numberButtons.map((g, i, arr) => (
          <>
            <div className="table-numbers-group">
              {g
                .sort((a, b) => a - b)
                .map((f) => (
                  <button key={`toPage-${f}`} onClick={() => toPage(f)}>
                    {f}
                  </button>
                ))}
            </div>
            {i < arr.length - 1 && <div> ... </div>}
          </>
        ))}
      </div>
      <button
        type="button"
        disabled={page.current === page.total}
        onClick={() => toPage(page.current + 1)}
      >
        next
      </button>
    </div>
  );
};

export default TableControls;
