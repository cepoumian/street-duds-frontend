import { useMutation, gql } from '@apollo/client';
import useForm from '../lib/hooks/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
  });

  const [requestReset, { data, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await requestReset().catch(console.error);
    clearForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Resuest A Password Reset</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link.</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="E-mail address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Password</button>
      </fieldset>
    </Form>
  );
}
