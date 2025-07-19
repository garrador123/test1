# Melodium Portfolio Website

A futuristic 3D portfolio website built with Three.js, showcasing projects in game development, music production, and web development.

## Features

- **3D Interactive Background**: Cosmic particle system and spiral effects using Three.js
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: CSS3 and JavaScript animations throughout
- **Project Showcases**: Dedicated sections for different skill areas
- **Modern UI**: Glassmorphism effects and neon accents
- **Contact Integration**: Footer with social links and contact information

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **3D Graphics**: Three.js
- **Styling**: Custom CSS with glassmorphism effects
- **Responsive**: CSS Grid and Flexbox
- **Animation**: CSS3 transitions and JavaScript interactions

## Project Structure

```
melodium-portfolio/
├── index.html              # Main HTML file
├── styles/
│   └── main.css            # Main stylesheet
├── js/
│   ├── three-scene.js      # Three.js scene setup
│   └── main.js             # Main JavaScript functionality
├── package.json            # Project configuration
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Modern web browser with WebGL support
- Python 3.x (for local development server)

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Start a local development server

### Running the Website

#### Option 1: Python Server (Recommended)
```bash
python -m http.server 8000
```

#### Option 2: Using npm scripts
```bash
npm run dev
```

#### Option 3: Any other local server
You can use any static file server like:
- Live Server (VS Code extension)
- Node.js `http-server`
- Apache/Nginx

### Accessing the Website

Open your browser and navigate to:
```
http://localhost:8000
```

## Customization

### Updating Content

1. **Personal Information**: Edit the contact details in `index.html`
2. **Projects**: Modify the project cards and detailed sections
3. **Styling**: Customize colors and effects in `styles/main.css`
4. **3D Effects**: Adjust particle systems in `js/three-scene.js`

### Color Scheme

The website uses a cyberpunk-inspired color palette:
- Primary: `#00ff88` (Neon Green)
- Secondary: `#6b46c1` (Purple)
- Background: Various dark gradients
- Text: White and light grays

### Adding New Sections

1. Add a new section in `index.html`
2. Create corresponding styles in `main.css`
3. Add navigation logic in `main.js`

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers with WebGL support

## Performance

- Optimized particle count for smooth 60fps
- Efficient Three.js rendering
- Lazy loading of heavy assets
- Responsive image handling

## Deployment

This is a static website that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Simply upload the files to your hosting provider.

## Development

### Adding New Features

1. **New 3D Effects**: Add to `js/three-scene.js`
2. **Interactive Elements**: Add to `js/main.js`
3. **Styling**: Add to `styles/main.css`
4. **Content**: Update `index.html`

### Performance Optimization

- Monitor FPS with browser dev tools
- Adjust particle count if needed
- Optimize textures and assets
- Use image compression

## License

MIT License - feel free to use this code for your own portfolio!

## Credits

- Three.js library for 3D graphics
- Inspiration from cyberpunk and sci-fi aesthetics
- Modern web design principles

## Support

For questions or issues, please open an issue in the repository or contact via the website's contact form.

---

**Happy coding!** 🚀✨
