module.exports.getFrontendUrl = () => {
  return process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL_PROD
    : process.env.FRONTEND_URL_DEV
}
