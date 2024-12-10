import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Form from '../../components/form/Form';
import FormRowVertical from '../../components/form/FormRowVertical';
import Input from '../../components/form/Input';
import Button from '../../components/Button/Button';

import { useCreateGenre } from './useCreateGenre';
import { useUpdateGenre } from './useUpdateGenre';

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
    movies?: [];
  };
  onCloseModal?: () => void;
};

export const GenreForm = ({ formData = {}, onCloseModal }: CreateFormProps) => {
  const { createGenre } = useCreateGenre();
  const { updateGenre } = useUpdateGenre();

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
    onCloseModal?.();
    localStorage.removeItem('EmailAccountValues');
  }
  function formHandler(formValues: any) {
    if (isUpdateSession && id) {
      updateGenre(
        { ...formValues, id: formData.id },
        {
          onSuccess: () => {
            clearFields();
          },
        }
      );
    } else {
      createGenre(formValues, {
        onSuccess: () => {
          clearFields();
        },
      });
    }
  }

  useEffect(() => {
    const storedValues = localStorage.getItem('GenreValues');
    if (storedValues) {
      reset(JSON.parse(storedValues));
    }
    return () => localStorage.removeItem('GenreValues');
  }, [reset]);

  return (
    <StyledContainer>
      <p>&larr; Genre</p>
      <Form style={{ minHeight: '100vh' }} onSubmit={handleSubmit(formHandler)}>
        <FormRowVertical label="Name" error={errors?.name?.message}>
          <Input {...register('name')} />
        </FormRowVertical>
        <ButtonGroup>
          <Button variation="secondary">Cancel</Button>
          <Button variation="primary">
            {' '}
            {isUpdateSession ? 'Update' : 'Save'}{' '}
          </Button>
        </ButtonGroup>
      </Form>
    </StyledContainer>
  );
};
