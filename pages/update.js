import UpdateProduct from '../components/products/UpdateProduct';

export default function UpdateProductPage({ query }) {
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}
