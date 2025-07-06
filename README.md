# 🚀 Modern Portfolio Website

A full-stack portfolio website built with React.js frontend and Node.js/Express backend, featuring a modern design, admin panel for content management, and dynamic content updates.

## ✨ Features

### Frontend Features
- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Hero Section**: Interactive typewriter effect with floating tech icons
- **About Section**: Dynamic content management
- **Projects Showcase**: Drag-and-drop reordering in admin panel
- **Skills Display**: Categorized skills with progress indicators
- **Education Timeline**: Academic history with scores
- **Certifications**: Professional certifications showcase
- **Contact Form**: EmailJS integration for direct messaging
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Mobile-first approach

### Backend Features
- **RESTful API**: Complete CRUD operations for all content
- **Admin Authentication**: JWT-based secure admin panel
- **MongoDB Integration**: Scalable data storage
- **File Upload**: Cloudinary integration for image management
- **Content Management**: Easy content updates through admin panel
- **Message Handling**: Contact form message storage

### Admin Panel Features
- **Dashboard**: Centralized content management
- **Project Management**: Add, edit, delete, and reorder projects
- **Skills Management**: Add and categorize skills
- **Education Management**: Academic records with scores
- **Certification Management**: Professional certifications
- **About Section**: Personal information updates
- **Message Center**: View and manage contact form submissions

## 🛠️ Tech Stack

### Frontend
- **React.js 19**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **FontAwesome**: Icon library
- **CSS3**: Custom styling with animations
- **EmailJS**: Contact form integration

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **Cloudinary**: Image upload service
- **Multer**: File upload handling
- **CORS**: Cross-origin resource sharing

## 📁 Project Structure

```
Portfolio/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication middleware
│   ├── index.js         # Server entry point
│   └── package.json
├── frontend/
│   └── react/
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── pages/       # Page components
│       │   └── styles/      # CSS files
│       ├── public/          # Static assets
│       └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Cloudinary account (for image uploads)
- EmailJS account (for contact form)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubham1singh23/portfolio.git
   cd portfolio
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend/react
   npm install
   ```

4. **Environment Variables**
   
   Create `.env` file in backend directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5000
   ```

5. **Run the Application**
   
   Backend (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
   Frontend (Terminal 2):
   ```bash
   cd frontend/react
   npm run dev
   ```

## 🎨 Customization Guide

### 1. Personal Information
- Update personal details in `frontend/react/src/components/About/About.jsx`
- Modify hero section in `frontend/react/src/components/Hero/Hero.jsx`
- Update social links in `frontend/react/src/components/Footer/Footer.jsx`

### 2. Styling
- Main color scheme: `frontend/react/src/index.css`
- Component-specific styles: Each component has its own CSS file
- Dark mode: Toggle available in navbar

### 3. Content Management
- Use the admin panel at `/admin` route
- Default admin credentials: Set up through `backend/createAdmin.js`
- All content is stored in MongoDB and can be updated through the admin interface

### 4. Adding New Sections
1. Create new component in `frontend/react/src/components/`
2. Add corresponding CSS file
3. Create MongoDB model in `backend/models/`
4. Add API routes in `backend/routes/`
5. Update admin panel to include new section

## 🔧 Configuration

### Database Setup
1. Create MongoDB database
2. Update `MONGO_URI` in backend `.env`
3. Run migration scripts if needed

### Image Upload
1. Create Cloudinary account
2. Update Cloudinary credentials in backend `.env`
3. Configure upload settings in `backend/cloudinary.js`

### Contact Form
1. Create EmailJS account
2. Set up email template
3. Update EmailJS credentials in `frontend/react/src/components/Contact/Contact.jsx`

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: 320px - 767px

## 🔒 Security Features

- JWT authentication for admin panel
- Password hashing with bcryptjs
- CORS configuration
- Input validation and sanitization
- Secure file upload handling

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables
2. Configure MongoDB connection
3. Deploy using Git integration

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Shubham Singh**
- GitHub: [@shubham1singh23](https://github.com/shubham1singh23)
- LinkedIn: [Shubham Singh](https://www.linkedin.com/in/shubham-singh-9765b9287)
- LeetCode: [shubham1singh23](https://leetcode.com/u/shubham1singh23/)
- Twitter: [@Shubham1singh23](https://x.com/Shubham1singh23)

## 🙏 Acknowledgments

- React.js community
- FontAwesome for icons
- Vite for build tooling
- MongoDB for database
- Cloudinary for image hosting

---

⭐ **Star this repository if you find it helpful!** 