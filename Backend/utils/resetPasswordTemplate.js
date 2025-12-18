const resetPasswordTemplate = (link, name) => `
  <div style="font-family:Arial;background:#f9fafb;padding:30px;">
    <div style="max-width:600px;margin:auto;background:white;border-radius:10px;padding:30px;">
      
      <h2 style="color:#0f172a;text-align:center;">
        Reset Your Password
      </h2>

      <p style="font-size:15px;color:#334155;">
        Hello <b>${name}</b>,
      </p>

      <p style="font-size:15px;color:#334155;">
        We received a request to reset your password for your
        <b>ABC Consultancy</b> account.
      </p>

      <div style="text-align:center;margin:30px 0;">
        <a href="${link}"
          style="background:#2563eb;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;">
          Reset Password
        </a>
      </div>

      <p style="font-size:13px;color:#64748b;">
        This link is valid for <b>1 hour</b>. If you did not request a password reset,
        you can safely ignore this email.
      </p>

      <hr style="margin:20px 0"/>

      <p style="font-size:12px;color:#94a3b8;text-align:center;">
        © ${new Date().getFullYear()} ABC Consultancy · Digital Growth Experts
      </p>
    </div>
  </div>
`

module.exports = {
  resetPasswordTemplate,
}
