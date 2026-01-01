# Honey Badger AI Gifts - Web Frontend

Single Page Application (SPA) frontend for Honey Badger AI Gifts.

## Overview

This is the web-based user interface for the Honey Badger AI Gifts platform. Users can create accounts, send motivational gift challenges to recipients, manage their network of contacts, and interact with the AI chatbot.

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with animations
- **JavaScript (ES6+)** - Vanilla JS, no framework
- **Vite** - Development server with hot reload

## Quick Start

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- Backend API running (see honey-badger-backend repo)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

### Backend Connection

Ensure the backend API is running on `http://localhost:3000`. The frontend is configured to connect to it automatically in development.

## Project Structure

```
honey-badger-web/
├── public/                 # Static files (served from root)
│   ├── index.html          # Main application page
│   ├── about.html          # About/landing page
│   ├── styles.css          # All CSS styling
│   ├── script.js           # Main application logic
│   └── app.js              # Alternative app structure
├── assets/                 # Media assets
│   ├── *.svg               # Logo and icon files
│   ├── *.png               # Images
│   ├── *.jpg               # Background images
│   └── *.mp4               # Video assets
├── package.json
├── vite.config.js
├── .gitignore
├── .env.example
└── README.md
```

## Features

### Authentication
- User signup with multi-step workflow
- Login/logout
- Password reset via email
- JWT token-based session management

### Gift Management
- Send Honey Badger gifts with challenges
- View sent gifts
- Track challenge progress
- Multiple gift types: gift cards, cash, photos, messages, etc.

### Challenge Types
- **Photo Challenge**: Recipient must upload a photo
- **Video Challenge**: Recipient must upload a video
- **Text Challenge**: Recipient must write a response
- **Keyword Challenge**: Response must contain specific keyword
- **Multi-Day Challenge**: Challenge spanning multiple days
- **Custom Challenge**: Fully customizable requirements

### Contact Management
- Add/edit/delete contacts
- Store contact details (name, phone, email, etc.)
- Track special dates (birthdays, anniversaries)
- Quick-send to contacts

### AI Chatbot
- Integrated chatbot powered by Claude (Anthropic)
- Get help with gift ideas
- Motivational message suggestions
- Challenge creation assistance

## Configuration

### API Base URL

The API base URL is configured in `public/script.js` and `public/app.js`:

```javascript
const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://api.honeybadger.com'; // Update for production
```

**For Production:**
1. Update the production URL in both files
2. OR use environment variable via Vite: `VITE_API_BASE_URL`

### Environment Variables

Create a `.env` file (copy from `.env.example`):

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Development

### Running the Dev Server

```bash
npm run dev
```

- Server runs on `http://localhost:5173`
- Hot reload enabled for instant updates
- Vite proxy configured to forward `/api/*` requests to backend

### Building for Production

```bash
npm run build
```

- Outputs to `dist/` directory
- Optimized and minified
- Ready for deployment

### Preview Production Build

```bash
npm run preview
```

- Serves the production build locally
- Test before deploying

## API Integration

The frontend communicates with the backend via REST API:

### Authentication Endpoints
- `POST /api/signup` - Create account
- `POST /api/login` - Login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Complete password reset

### Gift Endpoints
- `POST /api/send-honey-badger` - Send gift
- `GET /api/honey-badgers` - List sent gifts
- `GET /api/challenges/:id/progress` - Get challenge progress
- `PUT /api/challenges/:id/progress` - Update progress

### Contact Endpoints
- `POST /api/contacts` - Add contact
- `GET /api/contacts` - List contacts
- `DELETE /api/contacts/:id` - Delete contact
- `POST /api/contacts/:id/special-dates` - Add special date
- `GET /api/contacts/:id/special-dates` - List special dates
- `DELETE /api/special-dates/:id` - Delete special date

### Chat Endpoint
- `POST /api/chat` - Send message to AI chatbot

## Styling

### Color Scheme
- **Background**: `#0a0a0a` (near black)
- **Accent**: `#E2FF00` (bright yellow)
- **Secondary**: `#FFE55C` (light yellow)
- **Text**: `#fff` (white), `#ccc` (light gray)

### Design Features
- Dark theme with honey badger "fur texture" effects
- Glassmorphism with backdrop-filter blur
- Custom animations: `badgerPulse`, `furShimmer`, `slideIn`
- Responsive design (breakpoints: 1240px, 768px, 480px)
- Modal-based workflows
- Expandable form sections

## Deployment

### Recommended Platforms

- **Netlify**: Automatic builds from Git, free tier
- **Vercel**: Zero-config deployment, excellent performance
- **Cloudflare Pages**: Global CDN, fast and free
- **AWS S3 + CloudFront**: Scalable static hosting

### Deployment Steps

1. **Build the production bundle:**
   ```bash
   npm run build
   ```

2. **Set environment variable:**
   - `VITE_API_BASE_URL` = your production backend URL

3. **Deploy the `dist/` directory**

4. **Configure redirects** (for SPA routing):
   - Netlify: Add `_redirects` file: `/* /index.html 200`
   - Vercel: Add `vercel.json` with rewrites
   - Cloudflare: Configure in Pages settings

### Example Netlify Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Required Features:**
- ES6 support
- CSS Grid & Flexbox
- Fetch API
- LocalStorage
- CSS backdrop-filter (optional, degrades gracefully)

## Performance

- **Initial Load**: < 3s on 3G
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 4s
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices)

## Security

- **JWT Tokens**: Stored in localStorage (consider httpOnly cookies for production)
- **CORS**: Configured on backend to allow only frontend domain
- **Input Validation**: Client-side validation + server-side enforcement
- **XSS Protection**: HTML escaping via `escapeHtml()` function
- **HTTPS**: Required in production

## Troubleshooting

### CORS Errors
- Verify backend `FRONTEND_URL` environment variable
- Check browser console for specific CORS error
- Ensure backend is running and accessible

### API Connection Failed
- Verify `API_BASE_URL` in script.js matches backend URL
- Check backend is running on expected port (3000)
- Test backend health: `curl http://localhost:3000/health`

### Assets Not Loading
- Verify asset paths are relative (`/assets/...`)
- Check assets directory is being served
- Inspect Network tab in browser DevTools

### Authentication Issues
- Clear localStorage: `localStorage.clear()`
- Check token expiry (default 7 days)
- Verify backend JWT_SECRET matches

## Contributing

This is a proprietary project. Contact the development team for contribution guidelines.

## License

Proprietary - Honey Badger AI Gifts

## Support

For issues or questions, contact: [support contact]
