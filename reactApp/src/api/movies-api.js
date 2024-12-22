export const getMovies = async () => {
  const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=b535c3b8142ceefbfae4efc03a03f643&language=en-US&include_adult=false&page=1`
  );
  return response.json();
};
