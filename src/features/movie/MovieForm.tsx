import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import FileInput from "../../components/form/FileInput";
import Form from "../../components/form/Form";
import FormRowVertical from "../../components/form/FormRowVertical";
import Input from "../../components/form/Input";
import Row from "../../components/row/Row";
import { SingleSelect } from "../../components/select/Select";
import { useActor } from "../actor/useActor";
import { useGenre } from "../genre/useGenre";
import { useCreateMovie } from "./useCreateMovie";
import { useUpdateMovie } from "./useUpdate";

const ButtonGroup = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: flex-end;
	padding-top: 1rem;
`;
const StyledContainer = styled.div`
	width: 100%;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	background-color: white;
	border-radius: 8px;
`;
const StyledBoxContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(3, auto);
	gap: 1rem;
`;
const GroupButton = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
`;
export type CreateMovieFormProps = {
	formData?: {
		id?: number;
		title?: string;
		releaseYear?: number;
		duration?: number;
		actors?: [];
		genres?: [];
		picture?: any;
	};
	onCloseModal?: () => void;
};

export const CreateMovieForm = ({
	formData = {},
	onCloseModal,
}: CreateMovieFormProps) => {
	const { createMovie } = useCreateMovie();
	const { updateMovie } = useUpdateMovie();
	const { genres } = useGenre();
	const { actors } = useActor();
	const { id, ...otherProps } = formData;

	const isUpdateSession = Boolean(id);

	const {
		control,
		formState: { errors },
		reset,
		register,
		handleSubmit,
	} = useForm({
		defaultValues: isUpdateSession ? formData : {},
	});

	function clearFields() {
		reset();
		localStorage.removeItem("EmailAccountValues");
		onCloseModal?.();
	}
	function formHandler(formValues: any) {
		if (isUpdateSession && id) {
			updateMovie(
				{ ...formValues, id: formData.id },
				{
					onSuccess: () => {
						clearFields();
					},
				}
			);
		} else {
			createMovie(
				{
					...formValues,
					genres: [formValues.genres],
					actors: [formValues.actors],
				},
				{
					onSuccess: () => {
						clearFields();
					},
				}
			);
		}
	}

	useEffect(() => {
		const storedValues = localStorage.getItem("EmailAccountValues");
		if (storedValues) {
			reset(JSON.parse(storedValues));
		}
		return () => localStorage.removeItem("EmailAccountValues");
	}, [reset]);

	const formatedGenres = genres?.map((genre: any) => ({
		label: genre.name,
		value: genre.id,
	}));

	const formatedActors = actors?.map((actor: any) => ({
		label: actor.name,
		value: actor.id,
	}));

	return (
		<StyledContainer>
			<p>&larr; Movie</p>
			<Form style={{ minHeight: "100vh" }} onSubmit={handleSubmit(formHandler)}>
				<FormRowVertical label="Title" error={errors?.title?.message}>
					<Input {...register("title")} />
				</FormRowVertical>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<FormRowVertical
						label="Release Year"
						error={errors?.releaseYear?.message}
					>
						<Input {...register("releaseYear")} />
					</FormRowVertical>
					<FormRowVertical label="Duration" error={errors?.duration?.message}>
						<Input {...register("duration")} />
					</FormRowVertical>
				</div>

				<FormRowVertical label="Genre" error={errors?.genres?.message}>
					<SingleSelect
						name="genres"
						control={control}
						options={formatedGenres}
					/>
				</FormRowVertical>
				<FormRowVertical label="Actors" error={errors?.actors?.message}>
					<SingleSelect
						name="actors"
						control={control}
						options={formatedActors}
					/>
				</FormRowVertical>
				<ButtonGroup>
					<Button variation="secondary">Cancel</Button>
					<Button variation="primary">Save</Button>
				</ButtonGroup>
			</Form>
		</StyledContainer>
	);
};
