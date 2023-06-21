const errorMiddleware = (err, req, res, next) => {
  // Default error message
  let errorMessage = "An error occurred";

  if (err.errors) {
    // Mongoose validation errors
    const errorMessages = Object.values(err.errors).map(
      (error) => error.message
    );
    errorMessage = errorMessages.join(", ");
    return res.status(400).json({ message: errorMessage });
  } else if (err.code === 11000) {
    // MongoDB duplicate key error
    errorMessage = "Duplicate key error";
    return res.status(400).json({ message: errorMessage });
  }

  // Handle other types of errors
  errorMessage = err.message || errorMessage;
  return res.status(500).json({ message: errorMessage });
};

module.exports = errorMiddleware;
