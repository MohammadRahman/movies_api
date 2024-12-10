import { useEffect, useState } from 'react';
import Input from '../form/Input';
import { useSearchParams } from 'react-router-dom';
import Form from '../form/Form';
import Button from '../Button/Button';
import { useForm } from 'react-hook-form';
import { useSearchMovie } from '../../features/movie/useSearchMovie';

const SearchByMovieName = () => {
  const [isFetchMovie, setIsFetchMovie] = useState(false);
  const { findMovie, isFetched } = useSearchMovie(isFetchMovie);
  const [searchParmas, setSearhcParams] = useSearchParams();
  const { register, handleSubmit } = useForm();

  function handleForm(values: any) {
    const title = searchParmas.get('title');
    if (!title) {
      setSearhcParams({ title: values.title });
    }

    setIsFetchMovie(true);
  }

  useEffect(() => {
    if (isFetched) {
      setIsFetchMovie(false);
    }
  }, [isFetched, isFetchMovie]);
  return (
    <Form onSubmit={handleSubmit(handleForm)} style={{ all: 'unset' }}>
      <Input
        {...register('title')}
        style={{ padding: '0.4rem', borderRadius: '0' }}
      />
      <Button
        style={{ padding: '0.7rem', borderRadius: '0', outline: 'none' }}
        type="submit"
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchByMovieName;
