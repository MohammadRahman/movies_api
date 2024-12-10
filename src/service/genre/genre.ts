import { httpCommon } from '../http-common';

const url = 'http://localhost:8080/api';
const baseURL = httpCommon(url);

function findAllGenres() {
  return baseURL.get('/genres');
}
function createGenre(data: any) {
  return baseURL.post('/genres', { ...data, movies: [{ id: data.movies.id }] });
}
function deleteGenre(id: number) {
  return baseURL.delete(`/genres/${id}`);
}
function updateGenre(data: any) {
  const { id, name, movies } = data;
  return baseURL.patch(`/genres/${id}`, { name, movies });
}

export const genreService = {
  findAllGenres,
  deleteGenre,
  createGenre,
  updateGenre,
};
