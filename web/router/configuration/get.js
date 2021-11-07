const configurGetHandler = (req, res) => {
  const vard = 1;
  if (vard) {
    return res.response({ message: "this is true now" }).code(200);
  } else {
    return res.response({ message: "this is false now" }).code(201);
  }
};

module.exports = { configurGetHandler };
