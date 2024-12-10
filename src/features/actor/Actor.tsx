import { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '../../components/action-buttons/ActionButtons';
import ResponsiveTable from '../../components/table/ResponsiveTable';
import { useActor } from './useActor';
import { useDeleteActor } from './useDelteActor';
import Row from '../../components/row/Row';
import Heading from '../../components/heading/Heading';
import Button from '../../components/Button/Button';
import { Modal } from '../../components/modal/Modal';
import { ActorForm } from './ActorForm';

const Actor = () => {
  const { actors } = useActor();
  const { deleteActor } = useDeleteActor();

  console.log('actors');
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
      accessorKey: 'birthDate',
      header: 'Birth Date',
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
          // onEdit={(values) => onEdit(values)}
          isModal={true}
          modalName="actor"
          isLoading={false}
          data={row.original}
          deleteAccount={() => deleteActor(row.original.id)}
        />
      ),
      size: 150,
    },
  ];
  const actorData = Array.isArray(actors)
    ? actors.map((item) => ({
        id: item.id || 'Unknown ID',
        name: item.name || 'Unknown Name',
        birthDate: item.birthDate,
        movies: Array.isArray(item.movies) ? item.movies : [],
        moviesLength: Array.isArray(item.movies) ? item.movies.length : 0,
      }))
    : [];

  return (
    <div>
      <div style={{ paddingBottom: '2rem' }}>
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
