import { useState, useEffect } from "react";

const LoadDatabase = (url)  => {

  const [data, setData] = useState(null);
  const [waiting, setWaiting] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    const abort = new AbortController(); //
    setTimeout(() => {
      fetch(url, { signal: abort.signal })
      .then(response => {
        if (response.status===500) {
          setWaiting(false);
          setLoadError('Internal Server Error!');
        }
        if (!response.ok) {
          throw Error('Response not ok!');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setWaiting(false);
        setLoadError(null);
      })
      .catch(err => {
        if (!err.name === 'AbortError') {
          setWaiting(false);
          setLoadError(err.message);
        }
      })
    }, 50);
  return () => abort.abort();
  }, [url]);
return { data, waiting, loadError }
}

export default LoadDatabase;