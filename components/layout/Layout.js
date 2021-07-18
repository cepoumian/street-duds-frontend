import PropTypes from 'prop-types';
import { GlobalStyles } from '../styles/GlobalStyles';
import { InnerStyles } from '../styles/InnerStyles';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};
