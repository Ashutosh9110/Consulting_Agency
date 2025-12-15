const axios = require("axios")

exports.sendMail = async ({ to, subject, htmlContent }) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "ABC Consulting",
          email: "ashusingh19911082@gmail.com",
        },
        to: [{ email: to }],
        subject,
        htmlContent,
      },
      {
        headers: {
          "api-key": process.env.BREVO_SECRET,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      }
    )

    console.log("Brevo email sent:", response.data)
  } catch (err) {
    console.error(
      "Brevo email failed:",
      err.response?.data || err.message
    )
    throw err
  }
}
