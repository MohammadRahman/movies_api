import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import ActionButtons from "../../components/action-buttons/ActionButtons";
import Button from "../../components/Button/Button";
import Heading from "../../components/heading/Heading";
import { Modal } from "../../components/modal/Modal";
import Row from "../../components/row/Row";
import ResponsiveTable from "../../components/table/ResponsiveTable";
import { ActorForm } from "./ActorForm";
import { useActor } from "./useActor";
import { useDeleteActor } from "./useDelteActor";

const Actor = () => {
	const { actors } = useActor();
	const { deleteActor, isSuccess } = useDeleteActor();
	const [showForceDelete, setShowForceDelete] = useState(false);
	const [actorToDelete, setActorToDelete] = useState<number | null>(null);

	const handleDeleteActor = (id: number) => {
		// First try to delete, and check if it was successful
		deleteActor(id).then((result) => {
			if (result?.message?.includes("associated genres or actors")) {
				// If there are associated genres or actors, show the "Force Delete" option
				setShowForceDelete(true);
				setActorToDelete(id);
			}
		});
	};

	const handleForceDelete = (id: number) => {
		// Force delete if the user chooses to do so
		deleteActor(id, true).then(() => {
			setShowForceDelete(false);
			setActorToDelete(null);
		});
	};

	console.log("actors");
	const columns: ColumnDef<any>[] = [
		{
			accessorKey: "id",
			header: "ID",
			size: 150,
		},
		{
			accessorKey: "name",
			header: "Name",
			size: 150,
		},
		{
			accessorKey: "birthDate",
			header: "Birth Date",
			size: 150,
		},
		{
			accessorKey: "moviesLength",
			header: "Movies",
			size: 150,
		},
		{
			accessorKey: "movies",
			header: "",
			size: 0,
			cell: () => null,
		},
		{
			id: "actions", // Custom column for actions
			header: "Action",
			cell: ({ row }) => (
				<ActionButtons
					// onEdit={(values) => onEdit(values)}
					isModal={true}
					modalName="actor"
					isLoading={false}
					data={row.original}
					deleteAccount={() => handleDeleteActor(row.original.id)}
				/>
			),
			size: 150,
		},
	];
	const actorData = Array.isArray(actors)
		? actors.map((item) => ({
				id: item.id || "Unknown ID",
				name: item.name || "Unknown Name",
				birthDate: item.birthDate,
				movies: Array.isArray(item.movies) ? item.movies : [],
				moviesLength: Array.isArray(item.movies) ? item.movies.length : 0,
		  }))
		: [];

	return (
		<div>
			<div style={{ paddingBottom: "2rem" }}>
				<Row type="horizontal">
					<Heading as="h2">Actor</Heading>
					<Modal>
						<Modal.Open opens="actorForm">
							<Button type="button">Add Actor</Button>
						</Modal.Open>
						<Modal.Window name="actorForm" type="aside">
							<ActorForm />
						</Modal.Window>
					</Modal>
				</Row>
			</div>
			<ResponsiveTable
				searchProperty="name"
				columns={columns}
				data={actorData}
			/>
		</div>
	);
};

export default Actor;
