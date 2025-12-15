<h1>ABC Consulting Agency</h1>

<p><strong>ABC Consulting Agency</strong> is a full-stack consulting platform built with a modern React frontend and a robust Node.js backend. The application focuses on secure authentication, scalable architecture, and clean code practices, making it suitable for real-world enterprise use cases.</p>

<hr />

<h2>Key Highlights</h2>
<ul>
  <li>Secure Authentication with JWT & Google OAuth 2.0</li>
  <li>Email Verification & Password Reset using <strong>Brevio</strong></li>
  <li>Redis-based Caching for improved performance</li>
  <li>MySQL Database with <strong>Sequelize ORM</strong> (Hosted on Railway)</li>
  <li>Robust Input Validation using <strong>Joi</strong></li>
  <li>Role-Based Access Control (User / Admin)</li>
  <li>Scalable RESTful API architecture</li>
</ul>

<hr />

<h2>Tech Stack</h2>

<h3>Frontend</h3>
<ul>
  <li>React 19 (Vite)</li>
  <li>React Router DOM</li>
  <li>React Hook Form</li>
  <li>Axios</li>
  <li>Tailwind CSS</li>
</ul>

<h3>Backend</h3>
<ul>
  <li>Node.js & Express</li>
  <li>MySQL + Sequelize ORM</li>
  <li>Redis</li>
  <li>Passport.js (Google OAuth 2.0)</li>
  <li>JWT Authentication</li>
  <li>Joi Validation</li>
</ul>

<hr />


<hr />

<h2>Authentication Flow</h2>
<ol>
  <li>User registers with email & password</li>
  <li>Email verification link sent via Brevio</li>
  <li>User logs in and receives JWT token</li>
  <li>Optional login via Google OAuth 2.0</li>
  <li>Password reset supported via email</li>
</ol>

<hr />

<h2>Caching Strategy</h2>
<p>Redis is used to cache frequently accessed data such as user sessions and profile data, reducing database load and improving response times.</p>

<hr />

<h2>Database</h2>
<ul>
  <li>MySQL database hosted on <strong>Railway</strong></li>
  <li>Sequelize ORM for models, migrations, and relationships</li>
  <li>Environment-based configuration</li>
</ul>

<hr />

<h2> Validation & Security</h2>
<ul>
  <li>All API inputs validated using Joi</li>
  <li>Passwords hashed using bcrypt</li>
  <li>Rate limiting & compression enabled</li>
  <li>Secure environment variable handling</li>
</ul>

<hr />

<h2> Environment Variables</h2>
<pre>
# Backend
PORT=5000
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
REDIS_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
BREVIO_API_KEY=
</pre>

<hr />

<h2> Running the Project Locally</h2>

<h3>Backend</h3>
<pre>
cd backend
npm install
npm run dev
</pre>

<h3>Frontend</h3>
<pre>
cd frontend
npm install
npm run dev
</pre>

<hr />

<h2> Future Enhancements</h2>
<ul>
  <li>Admin dashboard analytics</li>
  <li>Docker support</li>
  <li>Unit & integration tests</li>
  <li>Audit logs</li>
</ul>

<hr />

<h2> Author</h2>
<p><strong>ABC Consulting Agency</strong><br />
A modern consulting platform built for scalability, security, and performance.</p>

<hr />

<h2>License</h2>
<p>This project is licensed under the ISC License.</p>
