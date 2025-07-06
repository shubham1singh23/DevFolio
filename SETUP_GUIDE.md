# 📋 Complete Setup Guide - Copy & Customize This Portfolio

This guide will walk you through the complete process of copying this portfolio project and making it your own.

## 🎯 Step 1: Fork/Clone the Repository

### Option A: Fork on GitHub (Recommended)
1. Go to the original repository: `https://github.com/shubham1singh23/portfolio`
2. Click the "Fork" button in the top-right corner
3. Clone your forked repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio.git
   cd portfolio
   ```

### Option B: Direct Clone
```bash
git clone https://github.com/shubham1singh23/portfolio.git
cd portfolio
```

## 🛠️ Step 2: Environment Setup

### Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend/react
npm install
```

### Create Environment Files

**Backend (.env file in backend directory):**
```env
MONGO_URI=mongodb://localhost:27017/your_portfolio_db
JWT_SECRET=your_super_secret_jwt_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

## 🗄️ Step 3: Database Setup

### MongoDB Setup
1. **Local MongoDB:**
   - Install MongoDB Community Edition
   - Start MongoDB service
   - Create database: `your_portfolio_db`

2. **MongoDB Atlas (Cloud):**
   - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create new cluster
   - Get connection string
   - Update `MONGO_URI` in `.env`

### Create Admin User
```bash
cd backend
node createAdmin.js
```
Follow prompts to create your admin account.

## ☁️ Step 4: Cloud Services Setup

### Cloudinary (Image Upload)
1. Create account at [Cloudinary](https://cloudinary.com/)
2. Get your credentials from Dashboard
3. Update `.env` file with your Cloudinary details

### EmailJS (Contact Form)
1. Create account at [EmailJS](https://www.emailjs.com/)
2. Create email service (Gmail, Outlook, etc.)
3. Create email template
4. Update Contact component with your credentials

## 🎨 Step 5: Personalize Content

### Update Personal Information

**1. Hero Section** (`frontend/react/src/components/Hero/Hero.jsx`):
```jsx
// Update these lines
const greeting = "Hello, I'm";
const name = "Your Name";
const typewriterTexts = [
  "Full Stack Developer",
  "UI/UX Designer", 
  "Problem Solver"
];
const description = "Your personal description here...";
```

**2. About Section** (`frontend/react/src/components/About/About.jsx`):
- Update personal details
- Add your bio
- Update profile image

**3. Social Links** (`frontend/react/src/components/Footer/Footer.jsx`):
```jsx
// Update with your social links
<a href="https://github.com/YOUR_USERNAME">GitHub</a>
<a href="https://linkedin.com/in/YOUR_LINKEDIN">LinkedIn</a>
<a href="https://leetcode.com/YOUR_LEETCODE">LeetCode</a>
<a href="https://twitter.com/YOUR_TWITTER">Twitter</a>
```

### Update Styling

**1. Color Scheme** (`frontend/react/src/index.css`):
```css
:root {
  --primary-color: #667eea;     /* Your primary color */
  --accent-blue: #764ba2;       /* Your accent color */
  --accent-green: #7ed6a7;      /* Success color */
  --accent-pink: #e0aaff;       /* Highlight color */
  --primary-bg: #0a0a0a;        /* Background color */
  --card-background: #1a1a1a;   /* Card background */
  --text-main: #ffffff;         /* Main text color */
  --text-secondary: #b0b0b0;    /* Secondary text */
}
```

**2. Fonts** (`frontend/react/src/index.css`):
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
```

## 📝 Step 6: Add Your Content

### Using Admin Panel
1. Start the application (see Step 7)
2. Go to `/admin` route
3. Login with your admin credentials
4. Add your:
   - Projects
   - Skills
   - Education
   - Certifications
   - About information

### Manual Content Addition
You can also directly update the components with static content if you prefer.

## 🚀 Step 7: Run the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend/react
npm run dev
```

### Access the Application
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- Admin Panel: `http://localhost:5173/admin`

## 🎯 Step 8: Customization Options

### Add New Sections
1. **Create Component:**
   ```bash
   mkdir frontend/react/src/components/NewSection
   touch frontend/react/src/components/NewSection/NewSection.jsx
   touch frontend/react/src/components/NewSection/NewSection.css
   ```

2. **Create Backend Model:**
   ```bash
   touch backend/models/NewSection.js
   touch backend/routes/newSection.js
   ```

3. **Add to Admin Panel:**
   - Update `AdminDashboard.jsx`
   - Add new tab and component

### Modify Existing Sections
- Each component is self-contained
- CSS files are component-specific
- Easy to modify without affecting other parts

## 🌐 Step 9: Deployment

### Backend Deployment (Heroku/Railway/Render)
1. **Create account** on your preferred platform
2. **Connect repository** to deployment service
3. **Set environment variables** in deployment dashboard
4. **Deploy** using Git integration

### Frontend Deployment (Vercel/Netlify)
1. **Build the project:**
   ```bash
   cd frontend/react
   npm run build
   ```
2. **Deploy the `dist` folder**
3. **Configure environment variables** if needed

### Domain Setup
1. **Purchase domain** (optional)
2. **Configure DNS** to point to your deployment
3. **Set up SSL** (usually automatic)

## 🔧 Step 10: Troubleshooting

### Common Issues

**1. MongoDB Connection Error:**
- Check if MongoDB is running
- Verify connection string in `.env`
- Ensure network access (for Atlas)

**2. Port Already in Use:**
```bash
# Find process using port
lsof -i :5000
# Kill process
kill -9 PID
```

**3. CORS Errors:**
- Check backend CORS configuration
- Verify frontend API calls use correct URL

**4. Image Upload Issues:**
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper file formats

### Performance Optimization
1. **Image Optimization:**
   - Use WebP format
   - Compress images
   - Use lazy loading

2. **Code Splitting:**
   - Implement React.lazy()
   - Use dynamic imports

3. **Caching:**
   - Implement service workers
   - Use browser caching

## 📚 Additional Resources

### Learning Materials
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Tutorial](https://docs.mongodb.com/)
- [Vite Documentation](https://vitejs.dev/)

### Useful Tools
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI
- [Postman](https://www.postman.com/) - API testing
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Frontend debugging

## 🎉 Congratulations!

You now have your own personalized portfolio website! 

### Next Steps:
1. **Add your projects** through the admin panel
2. **Customize the design** to match your style
3. **Deploy** to make it live
4. **Share** your portfolio with the world

### Keep Updated:
- Follow the original repository for updates
- Join the community discussions
- Contribute back if you make improvements

---

**Need Help?** 
- Check the [Issues](https://github.com/shubham1singh23/portfolio/issues) section
- Create a new issue for bugs
- Ask questions in discussions

**Show Your Support:**
- ⭐ Star the repository
- 🍴 Fork for your own use
- 💬 Share with others

Happy coding! 🚀 