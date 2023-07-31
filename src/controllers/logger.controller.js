export const loggerTest = (req, res) => {
  req.logger.debug("Test debug");
  req.logger.http("Test http");
  req.logger.info("Test info");
  req.logger.warning("Test warning");
  req.logger.error("Test error");
  req.logger.fatal("Test fatal");

  res.send({ message: "Resultado en consola" });
};
