# 🎭 Members Only

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://members-only-production-f7ed.up.railway.app/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

> **An exclusive members-only community platform where anonymity meets authenticity**

[**🚀 Live Demo**](https://members-only-production-f7ed.up.railway.app/) | [Features](#-features) | [Tech Stack](#-tech-stack) | [Installation](#-installation)

---

## 📖 Overview

**Members Only** is a sophisticated authentication-based community platform that implements a unique tiered access system. Non-members can browse posts but remain blind to their authors, while verified members gain full visibility into the community's conversations. Administrators wield the power to moderate content, ensuring a safe and respectful environment.

This project demonstrates advanced authentication patterns, role-based access control (RBAC), and secure session management in a modern Node.js application.

## ✨ Features

### 🔐 **Multi-Tier Authentication System**
- **Secure user registration** with bcrypt password hashing
- **Passport.js** local strategy authentication
- **Session-based** authentication with PostgreSQL session store
- **Persistent sessions** across server restarts

### 👥 **Role-Based Access Control**
- **Public Users**: View messages but cannot see authors or timestamps
- **Members**: Full access to view all message details including authors
- **Administrators**: Complete moderation capabilities with message deletion

### 💬 **Dynamic Message Board**
- Create and share messages with the community
- Real-time author attribution for verified members
- Chronological message sorting
- Clean, intuitive interface

### 🛡️ **Security Best Practices**
- Password hashing with bcrypt (10 salt rounds)
- SQL injection prevention with parameterized queries
- CSRF protection
- Secure session management
- Environment-based configuration

## 🛠️ Tech Stack

### **Backend**
- **Node.js** - JavaScript runtime
- **Express 5** - Web application framework
- **PostgreSQL** - Relational database
- **Passport.js** - Authentication middleware
- **bcryptjs** - Password hashing

### **Session Management**
- **express-session** - Session middleware
- **connect-pg-simple** - PostgreSQL session store

### **Frontend**
- **EJS** - Templating engine
- **CSS3** - Custom styling

### **Database**
- **PostgreSQL** - Production-grade RDBMS
- **pg** - Node.js PostgreSQL client

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Members-Only
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Configuration
Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/members_only
SESSION_SECRET=your-super-secret-session-key
PORT=3000
```

### Step 4: Database Setup
```bash
# Create database schema
npm run db:setup

# Seed with sample data
npm run db:seed
```

### Step 5: Run the Application
```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

Visit `http://localhost:3000` to see the application running! 🎉

## 📊 Database Schema

### Users Table
```sql
- id: SERIAL PRIMARY KEY
- username: VARCHAR(255) UNIQUE NOT NULL
- password: VARCHAR(255) NOT NULL
- is_member: BOOLEAN DEFAULT FALSE
- is_admin: BOOLEAN DEFAULT FALSE
- created_at: TIMESTAMP DEFAULT NOW()
```

### Messages Table
```sql
- id: SERIAL PRIMARY KEY
- title: VARCHAR(255) NOT NULL
- content: TEXT NOT NULL
- user_id: INTEGER REFERENCES users(id)
- created_at: TIMESTAMP DEFAULT NOW()
```

## 🎮 Usage

### Test Accounts (from seed data)
```
Username: sarah_knight | Password: 123 | Role: Member
Username: john_wanderer | Password: 123 | Role: User
Username: emma_guardian | Password: 123 | Role: Admin
Username: mike_seeker | Password: 123 | Role: User
Username: lisa_member | Password: 123 | Role: Member
```

### User Journey
1. **Sign Up** - Create your account with a unique username
2. **Login** - Authenticate with your credentials
3. **Browse** - View community messages (limited access)
4. **Join Club** - Enter the secret passcode to become a member
5. **Post Messages** - Share your thoughts with the community
6. **Moderate** - (Admin only) Delete inappropriate content

## 📁 Project Structure

```
Members-Only/
├── app.js                  # Application entry point
├── package.json            # Project dependencies
├── config/
│   └── passport.js         # Passport authentication strategy
├── controllers/
│   ├── authController.js   # Authentication logic
│   └── homePageController.js
├── db/
│   ├── pool.js            # PostgreSQL connection pool
│   ├── schema.sql         # Database schema
│   ├── seed.js            # Sample data seeder
│   └── setup.js           # Database initialization
├── middleware/
│   └── auth.js            # Authentication middleware
├── public/
│   └── styles.css         # Application styles
├── routes/
│   ├── authRouter.js      # Authentication routes
│   └── homePageRouter.js  # Main application routes
└── views/
    ├── createMessage.ejs  # Message creation form
    ├── index.ejs          # Homepage/message board
    ├── joinClub.ejs       # Membership upgrade form
    ├── login.ejs          # Login page
    └── sign-up.ejs        # Registration page
```

## 🌟 Key Highlights

### Why This Project Stands Out

✅ **Production-Ready Architecture** - Follows MVC pattern with clear separation of concerns

✅ **Enterprise-Grade Security** - Implements industry-standard authentication practices

✅ **Scalable Database Design** - Normalized PostgreSQL schema with proper indexing

✅ **Clean Code** - Well-organized, maintainable, and documented codebase

✅ **Real-World Application** - Solves actual use cases for exclusive communities

✅ **Deployed & Live** - Running in production on Railway

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ Session-based authentication
- ✅ Parameterized SQL queries (SQL injection prevention)
- ✅ Environment variable configuration
- ✅ Secure session cookies
- ✅ Role-based access control

## 🚢 Deployment

This application is deployed on [Railway](https://railway.app/) with PostgreSQL database.

**Live URL**: https://members-only-production-f7ed.up.railway.app/

### Deployment Steps (Railway)
1. Connect GitHub repository
2. Add PostgreSQL plugin
3. Configure environment variables
4. Deploy automatically on push

## 📝 Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run db:setup   # Initialize database schema
npm run db:seed    # Populate database with sample data
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built with ❤️ as part of [The Odin Project](https://www.theodinproject.com/) curriculum

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

[Report Bug](https://github.com/yourusername/members-only/issues) · [Request Feature](https://github.com/yourusername/members-only/issues)

</div>