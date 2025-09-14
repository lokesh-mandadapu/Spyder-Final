# SPYDER2 Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)
1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables** in Vercel Dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your JWT secret key
   - `NODE_ENV`: production

### Option 2: Netlify
1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Build and Deploy**:
   ```bash
   netlify deploy --prod --dir .
   ```

### Option 3: Heroku
1. **Install Heroku CLI**
2. **Create Heroku App**:
   ```bash
   heroku create spyder2-app
   ```

3. **Set Environment Variables**:
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-uri"
   heroku config:set JWT_SECRET="your-jwt-secret"
   heroku config:set NODE_ENV="production"
   ```

4. **Deploy**:
   ```bash
   git push heroku main
   ```

## 🔧 Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-super-secure-jwt-secret
FRONTEND_URL=https://your-domain.com
```

## 📋 Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] MongoDB Atlas whitelist updated with hosting IP
- [ ] CORS settings updated for production domain
- [ ] Security headers enabled
- [ ] Rate limiting configured
- [ ] SSL certificate enabled (automatic on most platforms)

## 🌐 GitHub Integration

1. **Create GitHub Repository**
2. **Push Code**:
   ```bash
   git remote add origin https://github.com/yourusername/spyder2.git
   git push -u origin main
   ```

3. **Enable Auto-Deploy** (Vercel/Netlify):
   - Connect GitHub repository
   - Enable automatic deployments on push

## 🔒 Security Considerations

- Use strong JWT secrets
- Enable MongoDB Atlas IP whitelisting
- Use HTTPS in production
- Regular security updates
- Monitor for vulnerabilities

## 📊 Monitoring

- Set up error tracking (Sentry)
- Monitor performance (Vercel Analytics)
- Database monitoring (MongoDB Atlas)
- Uptime monitoring (UptimeRobot)
