# JobHunt - Full Stack Job Portal

## 🚀 Project Overview
Full-stack job application platform connecting job seekers with employers

## 🌟 Features
### Frontend
- User authentication
- Job search & filtering
- Resume upload
- Job application tracking
- Responsive design

### Backend
- User & job management
- Application tracking
- Authentication middleware
- RESTful API endpoints

## 🛠 Tech Stack
### Frontend
- React.js
- Tailwind CSS
- Clerk Authentication
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (file upload)
- Cors

## 📦 Prerequisites
- Node.js
- npm
- MongoDB Atlas
- Clerk Account

## 🔧 Setup

### Frontend Setup
1. Navigate to frontend directory
2. Install dependencies
```bash
npm install
```
3. Create `.env` with:
- `REACT_APP_BACKEND_URL`
- `REACT_APP_CLERK_PUBLISHABLE_KEY`

### Backend Setup
1. Navigate to backend directory
2. Install dependencies
```bash
npm install
```
3. Create `.env` with:
- `MONGO_URI`
- `JWT_SECRET`
- `PORT`

## 🚦 Running Application
### Development
- Frontend: `npm start`
- Backend: `npm run dev`

### Production
- Frontend: `npm run build`
- Backend: `npm start`

## 📂 Project Structure
```
jobhunt/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── context/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
```

## 🔒 Authentication
- Clerk for user management
- JWT for secure API access

## 📝 Contributing
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License
MIT License
