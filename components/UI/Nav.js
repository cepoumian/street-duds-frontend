import Link from 'next/link';
import NavStyles from '../styles/NavStyles';
import SignOut from '../SignOut';
import CartCount from '../cart/CartCount';
import useUser from '../../lib/hooks/useUser';
import useCart from '../../lib/hooks/useCart';

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
          </button>
          <CartCount
            count={user.cart.reduce(
              (tally, cartItem) => tally + cartItem.quantity,
              0
            )}
          />
        </>
      )}
      {!user && <Link href="/signin">Sign In</Link>}
    </NavStyles>
  );
}
