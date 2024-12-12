import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { actorService } from "../../service/actor/actor";

export function useCreateActor() {
	const queryClient = useQueryClient();

	const { mutate: createActor, isPending } = useMutation({
		mutationKey: ["actors"],
		mutationFn: async (data: any) => {
			console.log("data received in actor", data);
			const response = await actorService.createActor(data);
			return response.data;
		},
		onSuccess: () => {
			toast.success("actor create successful");
			queryClient.invalidateQueries({ queryKey: ["actors"] });
		},
	});
	return { createActor, isPending };
}
