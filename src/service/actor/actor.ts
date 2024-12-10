import { httpCommon } from '../http-common';

const url = 'http://localhost:8080/api';
const baseURL = httpCommon(url);

function createActor(data: any) {
  return baseURL.post('/actors', { ...data, movies: [{ id: data.movies.id }] });
}
function findAllActors() {
  return baseURL.get('/actors');
}
function deleteActor(id: number) {
  return baseURL.delete(`/actors/${id}`);
}
function updateActor(data: any) {
  console.log('data in actor service', data);
  const { id, name, movies, birthDate } = data;
  return baseURL.patch(`/actors/${id}`, { name, birthDate, movies });
}

export const actorService = {
  findAllActors,
  deleteActor,
  createActor,
  updateActor,
};
