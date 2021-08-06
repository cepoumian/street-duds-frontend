import { gql, useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const update = (cache, payload) => {
  console.log('Runnig update');
  cache.evict(cache.identify(payload.data.deleteProduct));
};

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id },
      update,
    }
  );

  const deleteProductHandler = () => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteProduct().catch((error) => alert(error.message));
    }
  };

  return (
    <button
      type="button"
      style={{ cursor: 'pointer' }}
      disabled={loading}
      onClick={deleteProductHandler}
    >
      {children}
    </button>
  );
}
