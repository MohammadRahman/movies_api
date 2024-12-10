import { useGenre } from './useGenre';
import { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '../../components/action-buttons/ActionButtons';
import ResponsiveTable from '../../components/table/ResponsiveTable';
import { useDeleteGenre } from './useDeleteGenre';
import Row from '../../components/row/Row';
import Heading from '../../components/heading/Heading';
import { Modal } from '../../components/modal/Modal';
import Button from '../../components/Button/Button';
import { GenreForm } from './GenreForm';

const Genre = () => {
  const { genres } = useGenre();
  const { deleteGenre } = useDeleteGenre();
  console.log('genres');
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 150,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      size: 150,
    },
    {
      accessorKey: 'moviesLength',
      header: 'Movies',
      size: 150,
    },
    {
      accessorKey: 'movies',
      header: '',
      size: 0,
      cell: () => null,
    },
    {
      id: 'actions', // Custom column for actions
      header: 'Action',
      cell: ({ row }) => (
        <ActionButtons
          //   onEdit={(values) => onEdit(values)}
          isModal={true}
          modalName="genre"
          isLoading={false}
          data={row.original}
          deleteAccount={() => deleteGenre(row.original.id)}
        />
      ),
      size: 150,
    },
  ];
  const genreData = Array.isArray(genres)
    ? genres.map((item) => ({
        id: item.id || 'Unknown ID',
        name: item.name || 'Unknown Name',
        movies: Array.isArray(item.movies) ? item.movies : [],
        moviesLength: Array.isArray(item.movies) ? item.movies.length : 0,
      }))
    : [];

  return (
    <div>
      <div style={{ paddingBottom: '2rem' }}>
        <Row type="horizontal">
          <Heading as="h2">Genre</Heading>
          <Modal>
            <Modal.Open opens="actorForm">
              <Button type="button">Add Genre</Button>
            </Modal.Open>
            <Modal.Window name="actorForm" type="aside">
              <GenreForm />
            </Modal.Window>
          </Modal>
        </Row>
      </div>
      <ResponsiveTable
        searchProperty="name"
        columns={columns}
        data={genreData}
      />
    </div>
  );
};

export default Genre;
