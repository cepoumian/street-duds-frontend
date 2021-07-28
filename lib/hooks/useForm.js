import { useState, useEffect } from 'react';

export default function useForm(initialState = {}) {
  const [inputs, setInputs] = useState(initialState);
  const initialValues = Object.values(initialState).join();

  useEffect(() => {
    setInputs(initialState);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, type } = e.target;
    let { value } = e.target;

    if (type === 'number') {
      value = parseInt(value) || value;
    }

    if (type === 'file') {
      [value] = e.target.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => {
    setInputs({ initialState });
  };

  const clearForm = () => {
    const blankStateArrray = Object.entries(inputs).map(([key, value]) => [
      key,
      '',
    ]);
    const blankStateObject = Object.fromEntries(blankStateArrray);
    setInputs(blankStateObject);
  };

  return { inputs, handleChange, resetForm, clearForm };
}
