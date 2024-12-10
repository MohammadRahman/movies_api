import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Form from '../../components/form/Form';
import FormRowVertical from '../../components/form/FormRowVertical';
import Input from '../../components/form/Input';
import Button from '../../components/Button/Button';
import { useCreateActor } from './useCreateActor';
import { useUpdateActor } from './useUpdateActor';
import { SingleSelect } from '../../components/select/Select';
import { useMovies } from '../movie/useMovies';

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
export type CreateFormProps = {
  formData?: {
    id?: number;
    name?: string;
    birthDate?: string;
    movies?: [];
  };
  onCloseModal?: () => void;
};

export const ActorForm = ({ formData = {}, onCloseModal }: CreateFormProps) => {
  console.log('formdata while edit', formData);
  const { createActor } = useCreateActor();
  const { updateActor } = useUpdateActor();
  const { movies } = useMovies();
  const { id, ...otherProps } = formData;

  const isUpdateSession = Boolean(id);
  const formatedData = {
    id: formData.id,
    name: formData.name,
    birthDate: formData.birthDate,
    movies: formData.movies?.map((movie: any) => ({
      label: movie.title,
      value: movie.id,
    })),
  };
  const {
    control,
    formState: { errors },
    reset,
    register,
    handleSubmit,
  } = useForm({
    defaultValues: isUpdateSession ? formatedData : {},
  });

  function clearFields() {
    reset();
    onCloseModal?.();
    localStorage.removeItem('EmailAccountValues');
  }
  function formHandler(formValues: any) {
    if (isUpdateSession && id) {
      updateActor(
        { ...formValues, id: formData.id },
        {
          onSuccess: () => {
            clearFields();
          },
        }
      );
    } else {
      createActor(formValues, {
        onSuccess: () => {
          clearFields();
        },
      });
    }
  }

  const formatedMovieOptions = movies.map((movie: any) => ({
    label: movie.title,
    value: movie.id,
  }));

  useEffect(() => {
    const storedValues = localStorage.getItem('GenreValues');
    if (storedValues) {
      reset(JSON.parse(storedValues));
    }
    return () => localStorage.removeItem('GenreValues');
  }, [reset]);

  return (
    <StyledContainer>
      <p>&larr; Actor</p>
      <Form style={{ minHeight: '100vh' }} onSubmit={handleSubmit(formHandler)}>
        <FormRowVertical label="Name" error={errors?.name?.message}>
          <Input {...register('name')} />
        </FormRowVertical>
        <FormRowVertical label="Birth Date" error={errors?.birthDate?.message}>
          <Input {...register('birthDate')} />
        </FormRowVertical>
        <FormRowVertical label="Movies" error={errors?.movies?.message}>
          <SingleSelect
            name="movies"
            control={control}
            options={formatedMovieOptions}
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
