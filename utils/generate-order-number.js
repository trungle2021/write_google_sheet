function generateOrderNumber(lastValue, length) {
  console.log("in generateOrderNumber" + lastValue);
  const lastOrderNumber = Number(lastValue);
  const nextOrderNumber = lastOrderNumber + 1;
  const newOrderNumber = String(nextOrderNumber).padStart(length, "0");
  return newOrderNumber;
}

module.exports = generateOrderNumber;
