module.exports.getFrontendUrl = () => {
  const url =
    process.env.FRONTEND_URL_PROD ||
    process.env.FRONTEND_URL ||
    process.env.FRONTEND_URL_DEV

  if (!url) {
    throw new Error("Frontend URL is not configured")
  }

  return url.replace(/\/$/, "") // removes trailing slash
}
