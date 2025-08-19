import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function useFetch(url, method = "get", body = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const { accessToken, setAccessToken } = useContext(AuthContext);

  const effectRun = useRef(false); // fixing strange double running useEffect

  useEffect(() => {
    let isMounted = true; // fixing strange double running useEffect
    setLoading("loading...");
    setData(null);
    setError(null);

    const source = axios.CancelToken.source();

    if (effectRun.current) {
      axios[method](url, { data: body || undefined, cancelToken: source.token })
        // axios[method](url, { data: body || undefined, cancelToken: source.token })
        .then((res) => {
          if (isMounted) {
            res.data && setData(res.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          setError(err);
        });
    }
    return () => {
      isMounted = false;
      source.cancel();
      effectRun.current = true;
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
