# Satya Prakash | Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=20232A)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

Personal portfolio website for **Satya Prakash**, a Computer Science Engineering student and web developer. The site showcases my skills, projects, education, achievements, and contact information through a modern, responsive experience.

## Contents

- [Live Demo](#live-demo)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contact](#contact)
- [License](#license)

## Live Demo

Visit the portfolio: [satyaprakashh.vercel.app](https://satyaprakashh.vercel.app/)

## Screenshots

<details>
<summary>📸 Click to show screenshot</summary>

<br />

<div align="center">
  <img 
    src="./public/images/satyaprakash.png" 
    alt="Satya Prakash Portfolio Website" 
    width="900" 
  />

  <br /><br />

  <em>
    A modern and responsive single-page portfolio showcasing my skills,
    projects, articles, certifications, achievements, and contact information.
  </em>
</div>

</details>

## Features

- Responsive design for desktop, tablet, and mobile screens
- Modern and clean user interface
- Projects showcase
- Skills and technology stack section
- About me section
- Education and achievements
- Contact section
- Smooth animations and user-friendly navigation
- Admin area for managing portfolio content

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with the App Router
- **UI library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Database:** PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** Session-based admin authentication with Argon2 password hashing
- **Media:** [Cloudinary](https://cloudinary.com/) for image and file uploads
- **Animation:** [Motion](https://motion.dev/)
- **UI and utilities:** Radix UI, shadcn/ui, Lucide React, TanStack Query, and Zod
- **Other tools:** ESLint, Prettier, and Drizzle Kit

## Project Structure

```text
portfolio/
├── public/                 # Static assets, images, certificates, and resume files
├── scripts/                # Utility scripts such as admin seeding
├── src/
│   ├── actions/            # Server actions for portfolio content
│   ├── app/                # Next.js routes, layouts, and pages
│   ├── components/         # Home, admin, layout, and UI components
│   ├── data/               # Data access helpers
│   ├── db/                 # Drizzle schema and database client
│   ├── hooks/              # React hooks
│   ├── lib/                # Shared services and utilities
│   └── types/              # Shared TypeScript types
├── drizzle/                # Generated database migrations
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Data Model

The application stores portfolio content in PostgreSQL and uses Drizzle ORM for database access. The diagram below reflects the tables currently defined in `src/db/schema.ts`.

```mermaid
erDiagram
	users ||--o{ sessions : "creates"

	users {
		uuid id PK
		text email UK
		text password_hash
		boolean is_active
		timestamp created_at
		timestamp updated_at
	}

	sessions {
		uuid id PK
		uuid user_id FK
		text token UK
		timestamp expires_at
		timestamp created_at
	}

	resume {
		uuid id PK
		text file_name
		text file_url
		text public_id
		timestamp updated_at
	}

	about {
		uuid id PK
		text image_src
		text image_alt
		text intro
		text name
		text role
		text bio
		timestamp updated_at
	}

	tech_stack {
		uuid id PK
		text name
		text icon
		text category
		text brand_color
		integer sort_order
		timestamp updated_at
	}

	section_headings {
		uuid id PK
		text section UK
		text eyebrow
		text title
		text description
		timestamp updated_at
	}

	projects {
		uuid id PK
		text slug UK
		text title
		text description
		text_array tags
		text image
		text repo_url
		text demo_url
		text color_theme
		integer sort_order
		boolean is_published
		timestamp created_at
		timestamp updated_at
	}

	blogs {
		uuid id PK
		text slug UK
		boolean is_visible
		integer sort_order
		timestamp updated_at
	}

	certifications {
		uuid id PK
		text title
		text issuer
		text issue_date
		text certificate_image
		text verify_url
		boolean is_published
		integer sort_order
		timestamp created_at
		timestamp updated_at
	}

	contact_info {
		uuid id PK
		text email
		timestamp created_at
		timestamp updated_at
	}
```

Only the `users` to `sessions` relationship is explicitly defined as a foreign key in the current schema. The remaining tables represent independently managed portfolio sections.

## Installation and Setup

### Prerequisites

- Node.js with npm
- A PostgreSQL database
- A Cloudinary account for media uploads

### Local development

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

Create the environment file described below, then apply the database migrations:

```bash
npm run db:migrate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available scripts

| Command                | Description                  |
| ---------------------- | ---------------------------- |
| `npm run dev`          | Start the development server |
| `npm run build`        | Create a production build    |
| `npm run start`        | Start the production server  |
| `npm run lint`         | Run ESLint                   |
| `npm run format:check` | Check Prettier formatting    |
| `npm run db:generate`  | Generate Drizzle migrations  |
| `npm run db:migrate`   | Apply database migrations    |
| `npm run db:studio`    | Open Drizzle Studio          |

## Environment Variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL=<YOUR_POSTGRES_CONNECTION_STRING>

CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>
```

Keep `.env.local` out of version control and provide production values through your hosting provider's environment settings.

## Deployment

Build the application and run it with a Node.js-compatible hosting provider, such as Vercel or another platform that supports Next.js:

```bash
npm run build
npm run start
```

Configure the PostgreSQL and Cloudinary environment variables in the deployment platform before building. Run the database migrations against the production database as part of the release process.

## Contact

- **LinkedIn:** [linkedin.com/in/satyaprakash-in](https://www.linkedin.com/in/satyaprakash-in/)
- **GitHub:** [github.com/Satya7250](https://github.com/Satya7250)
- **X:** [x.com/satyaprakash_in](https://x.com/satyaprakash_in)
- **Hashnode:** [satyaa.hashnode.dev](https://satyaa.hashnode.dev/)
- **Email:** [satyaprakashh.dev@gmail.com](mailto:satyaprakashh.dev@gmail.com)
- **Portfolio:** [satyaprakashh.vercel.app](https://satyaprakashh.vercel.app/)

## License

No license has been specified for this project. Add a license here if you intend to make the source code available for reuse.
