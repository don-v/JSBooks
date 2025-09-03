someAsyncFunction((error, value) => {
  if (error) handleError(error);
  else processValue(value);
});