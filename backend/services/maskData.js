const maskValue = (
  value
) => {

  value = String(value);

  if (value.length <= 4) {
    return "****";
  }

  return (
    value.substring(0, 2) +
    "********" +
    value.substring(
      value.length - 2
    )
  );
};

module.exports = {
  maskValue,
};