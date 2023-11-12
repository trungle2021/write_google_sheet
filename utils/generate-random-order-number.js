function generateRandomOrderNumber(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let orderNumber = "";
  for (let i = 0; i < length; i++) {
    orderNumber += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return orderNumber;
};

module.exports = generateRandomOrderNumber;