import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const DELETE_FROM_CART_MUTATION = gql`
  mutation DELETE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteCartItem));
};

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(DELETE_FROM_CART_MUTATION, {
    variables: { id },
    update,
  });

  return (
    <BigButton
      type="button"
      onClick={removeFromCart}
      disabled={loading}
      title="Remove this item from cart"
    >
      &times;
    </BigButton>
  );
}
