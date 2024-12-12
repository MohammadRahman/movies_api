import { httpCommon } from "../http-common";

const url = "http://localhost:8080/api";
const baseURL = httpCommon(url);

function createActor(data: any) {
	return baseURL.post("/actors", { ...data, movies: [{ id: data.movies.id }] });
}
function findAllActors() {
	return baseURL.get("/actors");
}
function deleteActor(id: number, force?: boolean) {
	if (force) {
		return baseURL.delete(`/actors/${id}?force=true`);
	}
	return baseURL.delete(`/actors/${id}`);
}
function updateActor(data: any) {
	console.log("data in actor service", data);
	const { id, movies, ...otherProps } = data;
	console.log(otherProps);
	return baseURL.patch(`/actors/${id}`, otherProps);
}

export const actorService = {
	findAllActors,
	deleteActor,
	createActor,
	updateActor,
};
