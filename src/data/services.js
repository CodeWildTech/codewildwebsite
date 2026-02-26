export const services = [
    {
        id: '01',
        slug: 'website',
        title: 'Website',
        desc: 'Architecting high-performance, SEO-optimized web applications using Next.js.',
        tags: ['SaaS', 'Next.js'],
        details: {
            headline: 'Websites that perform, convert, and scale.',
            content:
                'We build blazing-fast, SEO-optimized websites using modern frameworks like Next.js and React. Every site is crafted with performance-first architecture, responsive design, and pixel-perfect attention to detail — ensuring your brand stands out in the digital landscape.',
            features: [
                'Server-Side Rendering & Static Generation',
                'Core Web Vitals Optimization',
                'Responsive & Mobile-First Design',
                'SEO & Accessibility Best Practices',
                'CMS Integration (Sanity, Strapi, WordPress)',
                'Analytics & Conversion Tracking',
            ],
            process: [
                { step: 'Discovery', desc: 'We analyze your brand, audience, and competitors to shape the strategy.' },
                { step: 'Wireframing', desc: 'Low-fidelity layouts map out user flows and content hierarchy.' },
                { step: 'Design', desc: 'High-fidelity mockups bring the vision to life with your brand identity.' },
                { step: 'Development', desc: 'Clean, performant code built with Next.js and deployed on the edge.' },
                { step: 'Launch & Optimize', desc: 'We deploy, monitor, and continuously optimize for peak performance.' },
            ],
            techStack: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'Sanity CMS', 'Google Analytics'],
        },
    },
    {
        id: '02',
        slug: 'web-application',
        title: 'Web Application',
        desc: 'Full-stack web applications with real-time capabilities and seamless user experiences.',
        tags: ['React', 'Full-Stack'],
        details: {
            headline: 'Powerful web apps built for the modern era.',
            content:
                'From SaaS dashboards to complex enterprise platforms, we build web applications that handle real-world complexity with elegance. Our full-stack expertise covers everything from interactive frontends to scalable backends and cloud infrastructure.',
            features: [
                'Real-Time Data & WebSocket Support',
                'Authentication & Role-Based Access',
                'API Design (REST & GraphQL)',
                'Database Architecture & Optimization',
                'Cloud Deployment & CI/CD Pipelines',
                'Third-Party Integrations & Webhooks',
            ],
            process: [
                { step: 'Requirements', desc: 'Deep-dive into your business logic, workflows, and user needs.' },
                { step: 'Architecture', desc: 'Design the system architecture, database schema, and API contracts.' },
                { step: 'Sprint Development', desc: 'Agile sprints deliver working features incrementally.' },
                { step: 'Testing & QA', desc: 'Comprehensive testing — unit, integration, and end-to-end.' },
                { step: 'Deployment', desc: 'Containerized deployment with monitoring and auto-scaling.' },
            ],
            techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
        },
    },
    {
        id: '03',
        slug: 'app-development',
        title: 'App Development',
        desc: 'Native and cross-platform mobile solutions for seamless experiences.',
        tags: ['React Native', 'iOS', 'Android'],
        details: {
            headline: 'Mobile apps that users love to use.',
            content:
                'We create native and cross-platform mobile applications that feel fluid, fast, and intuitive. Whether it\'s iOS, Android, or both — our apps are built with clean architecture, smooth animations, and offline-first strategies to keep users engaged.',
            features: [
                'Cross-Platform (React Native / Flutter)',
                'Native iOS & Android Development',
                'Offline-First Architecture',
                'Push Notifications & Deep Linking',
                'App Store Optimization (ASO)',
                'Biometric Authentication & Security',
            ],
            process: [
                { step: 'Strategy', desc: 'Define the target platforms, core features, and monetization model.' },
                { step: 'Prototyping', desc: 'Interactive prototypes validate the UX before a single line of code.' },
                { step: 'Development', desc: 'Modular, testable code with smooth 60fps animations.' },
                { step: 'Beta Testing', desc: 'Internal and external beta programs catch issues early.' },
                { step: 'Store Launch', desc: 'App Store and Play Store submissions with full ASO optimization.' },
            ],
            techStack: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Expo', 'Fastlane'],
        },
    },
    {
        id: '04',
        slug: 'ui-ux-design',
        title: 'UI/UX Design',
        desc: 'Beautiful interfaces that are conversion-optimized and accessible.',
        tags: ['Figma', 'UX Research'],
        details: {
            headline: 'Design that drives results, not just aesthetics.',
            content:
                'Great design is invisible — it just works. We create user interfaces that are beautiful, intuitive, and backed by research. From user journey mapping to pixel-perfect handoffs, every design decision is intentional and measurable.',
            features: [
                'User Research & Persona Development',
                'Wireframing & Information Architecture',
                'High-Fidelity UI Design',
                'Interactive Prototyping',
                'Design System & Component Libraries',
                'Usability Testing & A/B Experiments',
            ],
            process: [
                { step: 'Research', desc: 'User interviews, surveys, and competitive analysis build the foundation.' },
                { step: 'IA & Wireframes', desc: 'Information architecture and low-fi wireframes map the user journey.' },
                { step: 'Visual Design', desc: 'Brand-aligned, high-fidelity UI designs with motion concepts.' },
                { step: 'Prototyping', desc: 'Interactive Figma prototypes for stakeholder review and user testing.' },
                { step: 'Handoff', desc: 'Developer-ready specs with a reusable design system and tokens.' },
            ],
            techStack: ['Figma', 'Framer', 'Adobe CC', 'Maze', 'Hotjar', 'Lottie'],
        },
    },
];
