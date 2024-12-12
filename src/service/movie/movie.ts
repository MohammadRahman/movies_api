import { httpCommon } from "../http-common";

const url = "http://localhost:8080/api";
const baseURL = httpCommon(url);

function findAllMovies() {
	return baseURL.get("/movies");
}
function createMovie(data: any) {
	return baseURL.post("/movies", data);
}
function updateMovie(data: any) {
	return baseURL.patch(`/movies/${data.id}`, data);
}
function deleteMovie(id: number) {
	return baseURL.delete(`/movies/${id}`);
}
function findMovieByTitle(title: string) {
	return baseURL.get(`/movies/search?title=${title}`);
}

export const movieService = {
	findAllMovies,
	createMovie,
	updateMovie,
	deleteMovie,
	findMovieByTitle,
};
