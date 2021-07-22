export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    miminumFractionDigits: 2,
  };

  // check if it is a clean price
  if (amount % 100 === 0) {
    options.miminumFractionDigits = 0;
  }

  const formatter = Intl.NumberFormat('en-US', options);

  return formatter.format(amount / 100);
}
