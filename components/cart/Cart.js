import useUser from '../../lib/hooks/useUser';
import CartItem from './CartItem';
import CartStyles from '../styles/CartStyles';
import CloseButton from '../styles/CloseButton';
import Supreme from '../styles/Supreme';
import formatMoney from '../../lib/formatMoney';
import calcTotalPrice from '../../lib/calcTotalPrice';
import useCart from '../../lib/hooks/useCart';

export default function Cart() {
  const authedUser = useUser();
  const { cartOpen, closeCart } = useCart();

  if (!authedUser) return null;

  const { cart } = authedUser;

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{authedUser.name}'s Cart</Supreme>
        <CloseButton type="button" onClick={closeCart}>
          &times;
        </CloseButton>
      </header>
      <ul>
        {cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(cart))}</p>
      </footer>
    </CartStyles>
  );
}
