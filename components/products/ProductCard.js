import Link from 'next/link';
import ItemStyles from '../styles/ItemStyles';
import Title from '../styles/Title';
import PriceTag from './PriceTag';
import DeleteProduct from './DeleteProduct';
import AddToCart from '../cart/AddToCart';
import formatMoney from '../../lib/formatMoney';

export default function ProductCard({ product }) {
  const { photo, name, description, id, price } = product;
  return (
    <ItemStyles>
      <img src={photo?.image?.publicUrlTransformed} alt={name} />
      <Title>
        <Link href={`/product/${id}`}>{name}</Link>
      </Title>
      <PriceTag>{formatMoney(price)}</PriceTag>
      <p>{description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: {
              id,
            },
          }}
        >
          ✏️ &nbsp;&nbsp;Edit
        </Link>
        <AddToCart id={product.id} />
        <DeleteProduct id={id}>❌ &nbsp;&nbsp;Delete</DeleteProduct>
      </div>
    </ItemStyles>
  );
}
