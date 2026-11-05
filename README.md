# JESSICA - Multidisciplinary Artist Portfolio

![JESSICA Portfolio](https://placeholder.svg?height=300&width=800)

A modern, responsive portfolio website for JESSICA, a multidisciplinary artist specializing in photography, creative direction, and music. This website showcases her work, services, and artistic vision through an elegant and interactive user experience.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works beautifully on all devices.
- **Interactive UI**: Smooth animations and transitions using Framer Motion.
- **Portfolio Showcases**: Dedicated sections for photography, creative direction, and music.
- **Contact Form**: Integrated contact form with email notifications using Resend.
- **Dynamic Content**: Interactive galleries, lightboxes, and media players powered by Sanity CMS.
- **SEO Optimized**: Built with best practices for search engine visibility.

## 💻 Technologies

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **CMS**: [Sanity.io](https://www.sanity.io/)
- **Email**: [Resend](https://resend.com/) with [React Email](https://react.email/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Typography**: Google Fonts (Inter & Playfair Display)
- **Linting/Formatting**: ESLint

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20.x or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)
- [Sanity CLI](https://www.sanity.io/docs/cli) (if you need to manage the Sanity Studio)

## 🛠️ Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/jessica-portfolio.git
    cd jessica-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project. You'll need to add configuration for Sanity and Resend. See the [Environment Variables](#environment-variables) section for more details.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will be available at `http://localhost:3000`.

5.  **Run Sanity Studio (optional):**
    If you need to work with the CMS content locally:
    ```bash
    cd sanity # Navigate to the sanity directory if it's separate
    npm install # or yarn install (if it has its own package.json)
    npx sanity dev
    ```
    The Sanity Studio will be available at `http://localhost:3333`.

## 🔒 Environment Variables

This project requires the following environment variables to be set in a `.env.local` file at the project root:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID="..."
NEXT_PUBLIC_SANITY_DATASET="..."
NEXT_PUBLIC_SANITY_API_VERSION="..." # e.g., "2023-05-01"
# To find these, go to your project's dashboard at manage.sanity.io

# Resend API Key (for contact form)
RESEND_API_KEY="..."
# Your email address where contact form submissions will be sent
EMAIL_SEND_TO="..."
```

**Note:** Never commit your `.env.local` file to version control. The `.gitignore` file should already be configured to ignore it.

## スタジオ Sanity Studio

This project uses Sanity.io as a headless CMS to manage dynamic content such as portfolio items, testimonials, and service descriptions.

-   The Sanity Studio is embedded within this Next.js project and can be accessed at the `/studio` route (e.g., `http://localhost:3000/studio`) when the development server is running.
-   Schema definitions for the content models are located in the `schemaTypes/` directory.
-   To deploy changes to your Sanity Studio (e.g., new schemas), you can run:
    ```bash
    npx sanity deploy
    ```
    This usually requires you to be logged in to Sanity via the CLI (`npx sanity login`).

## 📜 Available Scripts

In the `package.json`, you can find the following scripts:

-   `dev`: Starts the Next.js development server with Turbopack.
-   `build`: Builds the Next.js application for production.
-   `start`: Starts the Next.js production server.
-   `lint`: Runs ESLint to check for code quality and style issues.

## 📂 Project Structure

The project follows a standard Next.js App Router structure:

```
.
├── app/                      # Main application directory (App Router)
│   ├── (api)/                # API routes (e.g., for contact form)
│   ├── (main pages)/         # Route groups for main site pages
│   │   ├── about/
│   │   ├── contact/
│   │   ├── creative-direction/
│   │   ├── music/
│   │   ├── photography/
│   │   ├── services/
│   │   └── page.tsx          # Homepage
│   ├── studio/               # Sanity Studio route
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── ...                   # Other layout, error, loading files
├── components/               # Reusable React components
│   ├── ui/                   # UI components from shadcn/ui
│   └── ...                   # Custom components
├── sanity/                   # Sanity client and query configurations
│   ├── sanity.client.ts
│   └── sanity.query.ts
├── schemaTypes/              # Sanity CMS schema definitions
├── lib/                      # Utility functions and libraries
│   ├── email.ts              # Email sending logic
│   └── utils.ts              # General utility functions
├── public/                   # Static assets (images, fonts, etc.)
├── .env.local.example        # Example environment variables file (optional)
├── next.config.ts            # Next.js configuration
├── sanity.config.ts          # Sanity Studio configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # This file
```

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to the project's coding standards and that all tests pass (if applicable).

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details (if a LICENSE file exists, otherwise state "MIT Licensed").
