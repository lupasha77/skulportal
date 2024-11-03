// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: err.message,
        errors: err.errors,
      });
    }
    
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized access',
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  };
  