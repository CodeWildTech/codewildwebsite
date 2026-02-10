# CodeWild Tech - Next.js Website

A modern, high-performance website built with Next.js 16, featuring smooth animations, responsive design, and a premium user experience.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 16 and React 19
- **Smooth Animations**: Powered by Framer Motion for fluid, engaging interactions
- **Responsive Design**: Fully responsive layout using Tailwind CSS 4
- **Custom Cursor**: Enhanced user experience with custom cursor interactions
- **Dynamic Sections**: About, Services, Products, Contact, and Careers pages
- **Job Application System**: Integrated career opportunities with application forms
- **SEO Optimized**: Built-in Next.js SEO best practices
- **Fast Performance**: Optimized for speed and user experience

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with App Router
- **UI Library**: [React 19](https://react.dev/) - Latest React features
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/) - Production-ready motion library
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- **HTTP Client**: [Axios](https://axios-http.com/) - Promise-based HTTP client
- **Linting**: ESLint with Next.js configuration

## 📁 Project Structure

```
codewildtech-next/
├── public/                 # Static assets
│   ├── founder.jpg        # Founder/team images
│   └── *.svg              # SVG icons and graphics
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── about/         # About page
│   │   ├── api/           # API routes
│   │   ├── careers/       # Careers page
│   │   ├── contact/       # Contact page
│   │   ├── products/      # Products page
│   │   ├── services/      # Services page
│   │   ├── layout.js      # Root layout
│   │   ├── page.js        # Home page
│   │   └── globals.css    # Global styles
│   ├── components/
│   │   ├── sections/      # Reusable page sections
│   │   │   ├── AboutSection.jsx
│   │   │   ├── ContactSection.jsx
│   │   │   ├── ProductsSection.jsx
│   │   │   └── ServicesSection.jsx
│   │   ├── forms/         # Form components
│   │   │   └── JobApplicationForm.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── data/              # Static data and content
│   │   └── products.js
│   └── assets/            # Additional assets (if any)
├── .gitignore
├── package.json
├── next.config.mjs        # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.mjs     # PostCSS configuration
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (or yarn/pnpm)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/codewildtech-next.git
   cd codewildtech-next
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Available Scripts

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Building for Production

```bash
# Create an optimized production build
npm run build

# Start the production server
npm start
```

The build output will be in the `.next` directory.

## 🎨 Customization

### Styling

This project uses Tailwind CSS 4. Customize the design system in:

- `src/app/globals.css` - Global styles and CSS variables
- `tailwind.config.js` - Tailwind configuration (if needed)

### Content

- **Products**: Edit `src/data/products.js` to update product information
- **Sections**: Modify components in `src/components/sections/` to update page content
- **Navigation**: Update `src/components/Navbar.jsx` for navigation changes

## 🌐 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

### Other Platforms

This Next.js application can be deployed on any platform that supports Node.js:

- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For any inquiries or support, please visit our [Contact Page](http://localhost:3000/contact).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons by [Lucide](https://lucide.dev/)

---

Made by CodeWild Tech
