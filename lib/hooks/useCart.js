import { useContext } from 'react';
import { LocalStateContext } from '../context/LocalStateContext';

function useCart() {
  const localContext = useContext(LocalStateContext);
  return localContext;
}

export default useCart;
