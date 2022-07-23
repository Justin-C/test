const getFormattedDate = () => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { year: '2-digit', month: 'numeric', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

export default getFormattedDate;
