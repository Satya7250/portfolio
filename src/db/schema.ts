import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
} from "drizzle-orm/pg-core";


// Stores admin authentication credentials for portfolio dashboard access.
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  email: text("email")
    .notNull()
    .unique(),

  passwordHash: text("password_hash")
    .notNull(),

  isActive: boolean("is_active")
    .default(true)
    .notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});


// Stores active admin sessions.
export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  token: text("token")
    .notNull()
    .unique(),

  expiresAt: timestamp("expires_at", {
    withTimezone: true,
  }).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

//resume
export const resume = pgTable("resume", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  fileName: text("file_name").notNull(),

  fileUrl: text("file_url").notNull(),

  publicId: text("public_id").notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});


// About
export const about = pgTable("about", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),
    
  // AboutMe component
  imageSrc: text("image_src").notNull(),

  imageAlt: text("image_alt").notNull(),

  intro: text("intro").notNull(),

  name: text("name").notNull(),

  role: text("role").notNull(),

  bio: text("bio").notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

// Tech Stack
export const techStack = pgTable("tech_stack", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  name: text("name").notNull(),

  // react, nextjs, nodejs, postgresql, etc.
  icon: text("icon").notNull(),

  // Frontend, Backend, Database, etc.
  category: text("category").notNull(),

  brandColor: text("brand_color"),

  sortOrder: integer("sort_order")
    .default(0)
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

//section heading
export const sectionHeadings = pgTable("section_headings", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  section: text("section")
    .notNull()
    .unique(),

  eyebrow: text("eyebrow").notNull(),

  title: text("title").notNull(),

  description: text("description").notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

//project
export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),

  slug: text("slug").unique().notNull(),

  title: text("title").notNull(),

  description: text("description").notNull(),

  tags: text("tags").array().notNull(),

  image: text("image").notNull(),

  repoUrl: text("repo_url"),

  demoUrl: text("demo_url"),

  colorTheme: text("color_theme")
    .default("purple")
    .notNull(),

  sortOrder: integer("sort_order")
    .default(0)
    .notNull(),

  isPublished: boolean("is_published")
    .default(true)
    .notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// blog
export const blogs = pgTable("blogs", {
  id: uuid("id").defaultRandom().primaryKey(),

  slug: text("slug")
    .notNull()
    .unique(),

  isVisible: boolean("is_visible")
    .default(true)
    .notNull(),

  sortOrder: integer("sort_order")
    .default(0)
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});