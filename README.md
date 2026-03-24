Spotify Clone Backend API

A role-based backend system for a Spotify-like music platform.
It provides user and artist authentication, music upload, album management, and secure access control using JWT.
Built with Node.js, Express, MongoDB, Mongoose, and ImageKit for cloud storage.
---
📌 Features
Authentication & Authorization
- Register and login using email/username + password
- Role-based access: User and Artist
- Protected APIs using JWT Authentication
- Secure cookie/token handling
- Unauthorized users cannot access protected routes
Artist Features
- Upload MP3 music files (ImageKit storage)
- Create albums
- Add songs to albums
- View their own albums
User Features
- Listen/view music
- Browse all albums
- View specific albums
Architecture
- Clean MVC structure
- Controllers, Models, Routes separated for clarity
- Error handling and complete HTTP status code usage
🛠 Tech Stack
---
Tool	Use
Node.js (Latest)	Runtime
Express (Latest)	HTTP Framework
MongoDB + Mongoose	Database & ODM
dotenv	Environment variables
ImageKit	Cloud storage for MP3 files
JWT	Authentication
```
📁 Project Structure (MVC)
root/
│── server.js
│── package.json
│── .env
│── src/
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── music.controller.js   
│   ├── models/
│   │   ├── user.model.js
│   │   ├── music.model.js
│   │   └── album.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── music.routes.js
│   ├── middleware/
│   │   ├── auth.middleware.js  
│   └── service/
│       └── imagekit.js
```
🔐 Environment Variables

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
📡 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register user/artist
POST	/api/auth/login	Login using username/email + password
POST	/api/auth/logout	Logout
Music & Album Routes

(All protected using JWT)

Method	Endpoint	Role	Description
GET	/api/music/	user/artist	Get all music
POST	/api/music/upload	artist	Upload MP3 music
POST	/api/music/album	artist	Create a new album
GET	/api/music/albums	user/artist	View all albums
GET	/api/music/albums/:albumID	user/artist	View a specific album
🧪 Authentication Flow
User/Artist registers with:
Username
Email
Password
Role (user/artist)
Login using:
Email + password or
Username + password
Server generates JWT token
Token is stored in cookies/headers
Protected routes validate:
JWT validity
User role
🚀 Running the Project
Install dependencies
npm install
Start server
npm run dev

or

node server.js
📦 Deployment

You can deploy on:

Render
Railway
Cyclic
Vercel (serverless functions)
AWS EC2

Make sure to configure environment variables properly on the platform.

📄 License

This project is licensed under the MIT License.
