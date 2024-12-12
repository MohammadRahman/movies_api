import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { actorService } from "../../service/actor/actor";

export function useDeleteActor() {
	const queryClient = useQueryClient();

	const {
		mutate: deleteActor,
		isPending,
		isSuccess,
	} = useMutation({
		mutationKey: ["actors"],
		mutationFn: async ({ id, force }: { id: number; force?: boolean }) => {
			const response = await actorService.deleteActor(id, force);
			return response.data;
		},
		// mutationFn: async (id: number) => {
		// 	const response = await actorService.deleteActor(id);
		// 	return response.data;
		// },
		onSuccess: () => {
			toast.success("actor delete successful!");
			queryClient.invalidateQueries({ queryKey: ["actors"] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
	return { deleteActor, isPending, isSuccess };
}
