import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import Head from 'next/head';
import DisplayError from '../ErrorMessage';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading....</p>;

  if (error) return <DisplayError error={error} />;

  const { description, name, price, id: productId, photo } = data.Product;
  const {
    altText,
    image: { publicUrlTransformed },
  } = photo;

  return (
    <ProductStyles>
      <Head>
        <title>Hot Duds | {name}</title>
      </Head>
      <img src={publicUrlTransformed} alt={altText} />
      <div className="details">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </ProductStyles>
  );
}

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  align-items: top;
  max-width: var(--maxWidth);
  img {
    width: 100%;
    object-fit: contain;
  }
`;
