const verifyEmailTemplate = (link) => `

  <div style="font-family:Arial;background:#f9fafb;padding:30px;">
    <div style="max-width:600px;margin:auto;background:white;border-radius:10px;padding:30px;">
      <h2 style="color:#0f172a;text-align:center;">
        Welcome to ABC Consultancy
      </h2>

      <p style="font-size:15px;color:#334155;">
        We specialize in <b>Web Design, Web Development, Google Ads, and Online Branding</b>.
        To get started, please verify your email address.
      </p>

      <div style="text-align:center;margin:30px 0;">
        <a href="${link}"
          style="background:#2563eb;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;">
          Verify Email
        </a>
      </div>

      <p style="font-size:13px;color:#64748b;">
        This link is valid for 24 hours. If you did not create an account, you may safely ignore this email.
      </p>

      <hr style="margin:20px 0"/>

      <p style="font-size:12px;color:#94a3b8;text-align:center;">
        © ${new Date().getFullYear()} ABC Consultancy · Digital Growth Experts
      </p>
    </div>
  </div>
  `


  module.exports = {
    verifyEmailTemplate,
  };