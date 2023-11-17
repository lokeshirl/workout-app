const baseURL = 'http://localhost:4000';

export const fetchDataFromAPI = async (urlEndPoint, options = {}) => {
  const url = `${baseURL}${urlEndPoint}`;

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log('src :: utils :: api :: fetchDataFromAPI :: ERR :: ', error);
  }
};

// const workout = {
//   title: 'Chin ups',
//   load: 0,
//   reps: 25,
// };

// const jsonData = fetchDataFromAPI('/api/workouts', {
//   method: 'POST',
//   body: JSON.stringify(workout),
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// console.log('JSON DATA :: ', jsonData);

// jsonData
//   .then((data) => console.log('JSON DATA DOT THEN :: ', data))
//   .catch((error) => console.log('JSON DATA DOT CATCH :: ', error));
