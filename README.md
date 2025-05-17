# JagadeeshIndia Consulting Website

A modern React website for JagadeeshIndia Consulting, a technical consulting firm based in Hyderabad, focusing on MSME development, government initiatives, and policy implementation.

## Features

- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Modern UI/UX**: Sleek animations, transitions and interactive elements
- **Component-Based Architecture**: Using React best practices
- **Enhanced User Experience**: Interactive elements, form validation, and visual feedback
- **Home Page**: A landing page that introduces the consulting firm and highlights its services
- **Recent Projects**: A dedicated page showcasing recent projects with filtering capabilities
- **Contact Us**: A page with a validated contact form for inquiries
- **404 Page**: Custom Not Found page for better user experience

## Project Structure

```
consulting-firm-website/
├── public/                  # Static assets
│   ├── images/              # Image assets
│   └── index.html           # HTML entry point
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ContactForm.tsx
│   │   ├── CtaSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Layout.tsx
│   │   ├── ProcessTimeline.tsx
│   │   └── TestimonialCarousel.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── useIntersectionObserver.ts
│   ├── pages/               # Page components
│   │   ├── ContactUsPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── NotFoundPage.tsx
│   │   └── RecentProjectsPage.tsx
│   ├── services/            # API services
│   │   └── contactService.ts
│   ├── styles/              # CSS modules
│   │   ├── animations.css
│   │   ├── carousel.css
│   │   ├── components.css
│   │   ├── cta.css
│   │   ├── form.css
│   │   ├── hero-section.css
│   │   ├── index.css
│   │   ├── process-timeline.css
│   │   ├── project-cards.css
│   │   └── services.css
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── package.json             # Project dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## Technical Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: CSS with modular approach
- **Routing**: React Router for navigation
- **Animations**: CSS animations and transitions
- **Form Handling**: React state management with validation

## Key Components

- **HeroSection**: Dynamic hero section with sliding content and call-to-action buttons
- **ProcessTimeline**: Interactive timeline with scroll-triggered animations
- **TestimonialCarousel**: Carousel component for testimonials with autoplay and manual navigation
- **ContactForm**: Form with validation, loading states, and visual feedback
- **CtaSection**: Call-to-action section with animated background
- **Layout**: Consistent layout wrapper with header and footer

## Animation Features

- Fade-in animations for content sections
- Slide-in transitions for timeline elements
- Scroll-triggered animations using Intersection Observer API
- Hover effects for interactive elements
- Loading animations for form submission
- Image and card hover effects
- Animated slider for hero section headlines

## Responsiveness

The website is designed to be fully responsive across all device sizes:
- **Mobile**: Optimized layout for small screens
- **Tablet**: Adjusted grid layouts for medium screens
- **Desktop**: Full experience for large screens

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd consulting-firm-website
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

- Navigate through the website using the navigation bar
- Experience interactive elements by hovering over service cards and timeline elements
- Use the testimonial carousel to view client testimonials
- View recent projects with category filtering options
- Submit inquiries through the validated contact form

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License.