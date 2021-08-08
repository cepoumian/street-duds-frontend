import Link from 'next/link';
import Nav from '../UI/Nav';
import Cart from '../cart/Cart';
import Search from '../Search';
import { HeaderStyles } from '../styles/HeaderStyles';
import { LogoStyles } from '../styles/LogoStyles';

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <LogoStyles>
          <Link href="/">Hot Duds</Link>
        </LogoStyles>
        <Nav />
      </div>
      <div className="sub-bar">
        <Search />
      </div>
      <Cart />
    </HeaderStyles>
  );
}
