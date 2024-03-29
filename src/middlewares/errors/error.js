import EErrors from "../../errors/enum.js";

export default (error, req, res, next) => {
  switch (error.code) {
    case EErrors.INVALID_TYPES_ERROR:
      res.send({
        status: "error",
        error: error.name,
        message: error.message,
      });
      break;
    default:
      console.log(error)
      res.send({
        status: "error",
        error: "unhandled error",
      });
      break;
  }
};