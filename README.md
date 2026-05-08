# TeDev Portfolio 🚀

A modern, responsive portfolio website built with **React** and **Tailwind CSS**. Perfect for showcasing your skills, projects, and achievements in data science, machine learning, and web development.

## Features ✨

- 🎨 **Modern Dark Theme** - Professional dark UI with blue accents
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Smooth Animations** - Elegant fade-in effects and carousel animations
- 🎯 **Sections Included**:
  - Hero/Home Section
  - About Me with Education & Experience
  - Projects Showcase
  - Skills & Technologies (with carousel)
  - Achievements & Certifications
  - Contact Form
  - Smooth Scroll Navigation

## Project Structure 📁

```
TeDev_Portfolio/
├── src/
│   ├── App.jsx           # Main React component
│   ├── App.css           # Custom styles & animations
│   ├── index.css         # Global styles
│   └── main.jsx          # React entry point
├── index.html            # HTML template
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── vite.config.js        # Vite build configuration
├── package.json          # Dependencies
└── README.md             # This file
```

## Getting Started 🏁

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Customization 🎨

### Update Your Information

Edit `src/App.jsx` to update:
- **Name & Title** - Change "Your Name" and "Python + SQL Developer"
- **Bio** - Update the about section
- **Education/Experience** - Modify the cards in the About section
- **Projects** - Add your own projects with details
- **Skills** - Update technologies and skill categories
- **Achievements** - Add your milestones
- **Contact Info** - Update email, phone, location, social links

### Colors & Theme

Modify colors in `tailwind.config.js`:
```javascript
colors: {
  bg:      '#0a0f1e',    // Background
  card:    '#0f1630',    // Card background
  border:  'rgba(255,255,255,0.08)',
  muted:   '#8892a4',    // Text muted
  blue:    '#3b82f6',    // Primary blue
  'blue-d':'#2563eb',    // Dark blue
}
```

### Fonts

The portfolio uses three Google Fonts:
- **Syne** - For headings (title)
- **Manrope** - For body text
- **JetBrains Mono** - For code blocks

Change them in `src/index.css` @import statement.

## Technologies Used 🛠️

- **React 18** - JavaScript UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS preprocessing

## Key Sections Explained 📖

### Hero Section
- Introduction with call-to-action buttons
- Social media links (GitHub, LinkedIn, Email)
- Code card showcase

### About Section
- Bio paragraph
- Education and experience cards
- Profile card with avatar and tags
- Download resume button

### Projects Section
- Project cards with thumbnails
- Description and tech stack
- GitHub links

### Skills Section
- 6 skill categories
- Technology carousel (auto-scrolling)
- Interactive hover effects

### Achievements Section
- Timeline of milestones
- Achievement type badges

### Contact Section
- Contact information
- Contact form
- Social media links

## Tips & Best Practices 💡

1. **Add Real Data**: Replace placeholder text with your actual information
2. **Update Links**: Fix GitHub, LinkedIn, and email links
3. **Add Images**: Replace emoji in projects with actual screenshots
4. **Optimize Performance**: Compress images before uploading
5. **SEO**: Update meta tags in `index.html`
6. **Deploy**: Use Vercel, Netlify, or GitHub Pages for free hosting

## Deployment 🚀

### Using Vercel (Recommended)
1. Push your code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Using Netlify
1. Run `npm run build`
2. Drag & drop `dist` folder to Netlify
3. Done!

### Using GitHub Pages
1. Add to `vite.config.js`: `base: '/repo-name/'`
2. Run `npm run build`
3. Push `dist` folder to `gh-pages` branch

## License 📄

Feel free to use this portfolio template for your projects!

## Support 💬

If you have questions or need help:
- Check the original component code
- Refer to [Tailwind CSS Docs](https://tailwindcss.com/)
- Review [React Documentation](https://react.dev)

---

**Built with ❤️ for developers, data scientists, and creators.**
