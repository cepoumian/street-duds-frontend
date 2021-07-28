import SingleProduct from '../../components/products/SingleProduct';

export default function SingleProductPage({ query: { id } }) {
  return (
    <div>
      <SingleProduct id={id} />
    </div>
  );
}
