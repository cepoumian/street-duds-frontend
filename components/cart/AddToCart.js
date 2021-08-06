import { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import CURRENT_USER_QUERY from '../../lib/queries/currentUserQuery';
import useCart from '../../lib/hooks/useCart';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
      quantity
    }
  }
`;

export default function AddToCart({ id }) {
  const [addToCart, { loading, data }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const { openCart } = useCart();

  useEffect(() => {
    let timer;
    if (data) {
      timer = setTimeout(() => {
        openCart();
      }, 700);
    }
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <button
      disabled={loading}
      type="button"
      style={{ cursor: 'pointer' }}
      onClick={addToCart}
    >
      🛒 &nbsp; Add{loading && 'ing'} To Cart
    </button>
  );
}
