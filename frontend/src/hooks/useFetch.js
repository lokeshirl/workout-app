import { useEffect, useState } from 'react';
import { fetchDataFromAPI } from '../utils/api';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(null);
    setError(null);
    setLoading(true);

    // fetch data from api
    fetchDataFromAPI(url, options)
      .then((res) => setData(res))
      .catch((error) =>
        setError(`Error in src :: hooks :: useFetch :: ${error}`)
      )
      .finally(setLoading(false));
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
