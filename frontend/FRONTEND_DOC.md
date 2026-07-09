# TaskHub Frontend Documentation

Welcome to the TaskHub frontend documentation! This document provides a detailed overview of the frontend project structure, build configurations, authentication systems, styling patterns, and the architectural improvements implemented to keep the code clean and scalable.

---

## 1. Project Overview & Tech Stack

TaskHub's frontend is a modern web application built using:
- **React Router v7** (formerly Remix v2/v3): A routing-focused framework utilizing compiler-based code generation for type safety and fast page loading.
- **Vite**: The build tool and development server, configured with the new `@tailwindcss/vite` plugin.
- **Tailwind CSS v4**: For utility-first styling.
- **TypeScript**: Ensuring strict type safety across all components and API calls.
- **shadcn UI & Radix UI**: Accessible, customizable component primitives (buttons, inputs, cards, fields, forms).
- **React Hook Form & Zod**: Form management and schema validation.

---

## 2. Directory Structure

Following the recent architectural clean-up, the directory structure is organized as follows:

```text
frontend/
├── app/
│   ├── components/            # UI components (shadcn/Radix primitives)
│   │   └── ui/                # Standardized reusable visual elements
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities, APIs, and schemas
│   │   ├── api.ts             # API request wrappers (getAuth, postAuth, token refresh)
│   │   ├── schema.ts          # Zod validation schemas (Sign-in, sign-up, etc.)
│   │   └── utils.ts           # Classnames merger (clsx + tailwind-merge)
│   ├── pages/                 # Pure visual Page components & views (NEW)
│   │   ├── auth/              # Sign-In, Sign-Up, Reset Password, etc.
│   │   └── home/              # Landing page component and sections
│   │       ├── components/    # Landing page sub-sections (Navbar, Hero, Features, etc.)
│   │       └── home-page.tsx  # Landing page main assembly
│   ├── routes/                # Route definitions & entrypoints (extremely lightweight)
│   │   ├── auth/              # Layout and entry routes wrapping auth pages
│   │   ├── root/              # Home route entrypoint
│   │   └── +types/            # Auto-generated React Router types
│   ├── app.css                # Global styles and Tailwind directives
│   ├── root.tsx               # Application HTML document shell & ErrorBoundary
│   └── routes.ts              # Route path definitions mapping to route files
├── public/                    # Static assets (Favicons, Mockup PNGs)
├── package.json               # Package dependencies & scripts
├── tsconfig.json              # TypeScript compiler options
└── vite.config.ts             # Vite setup with Tailwind v4 plugin
```

---

## 3. Configuration & Bootstrapping

### Vite Configuration (`vite.config.ts`)
The project utilizes Vite as its builder. It integrates Tailwind CSS v4 via `@tailwindcss/vite` and loads React Router:
```typescript
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
```

### Route Definitions (`app/routes.ts`)
React Router v7 configures route trees programmatically in `app/routes.ts`. Layout paths are used to wrap sub-routes with shared layouts (such as auth layout):
```typescript
import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/auth/auth-layout.tsx", [
    index("routes/root/home.tsx"),
    route("sign-in", "routes/auth/sign-in.tsx"),
    route("sign-up", "routes/auth/sign-up.tsx"),
    route("forgot-password", "routes/auth/forgot-password.tsx"),
    route("reset-password", "routes/auth/reset-password.tsx"),
    route("verify-email", "routes/auth/verify-email.tsx"),
  ]),
] satisfies RouteConfig;
```

---

## 4. Architectural Improvements

To maintain clean code separation, we restructured the project using a **Pages/Routes** separation pattern:

1. **Routing Files (`app/routes/`)** are now simple, lightweight wrapper scripts. They define route-specific traits (like HTML metadata) and export the corresponding page view.
2. **Page Views (`app/pages/`)** contain all user interface code, state handling, forms, and business logic. They do not worry about routing configs.
3. **No Placeholders**: Replaced low-fidelity text blocks in landing pages with high-fidelity screenshot assets of the TaskHub app.
4. **Interactive Mobile Menu**: Enabled state tracking on the mobile toggle, making the landing page responsive on all devices.
5. **Fixed Typographic Typos**: Renamed files (e.g. `benifit-section.tsx` -> `benefit-section.tsx`) to adhere to standard English spelling.

---

## 5. Key Code Explanations & Examples

### A. Routing Wrappers vs. Page Components
The route entrypoint is a thin wrapper. For example, the home route file is located at `app/routes/root/home.tsx`:
```tsx
import HomePage from "@/pages/home/home-page";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskHub - Modern Task Management" },
    { name: "description", content: "Welcome to TaskHub!" },
  ];
}

export default function Home() {
  return <HomePage />;
}
```
This delegates the rendering cleanly to the `HomePage` component located at `app/pages/home/home-page.tsx`:
```tsx
import Navbar from "./components/navbar";
import HeroSection from "./components/hero-section";
import FeaturesSection from "./components/features";
import HowItWorks from "./components/how-it-works";
import BenefitsSection from "./components/benefit-section";
import CTASection from "./components/cta-section";
import Footer from "./components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
```

### B. API Integration & Token Management (`app/lib/api.ts`)
The API wrapper manages authentication, state, and HTTP headers:
- Access tokens are stored in `localStorage` and sent in the `Authorization` header.
- If a `GET` request fails due to `401 Unauthorized`, the client makes a `refresh-token` POST call to acquire a new token.
- Concurrent requests share a deduplicated refresh token promise.

```typescript
export async function getAuth<TData>(path: string): Promise<TData> {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
  });

  if (response.status === 401) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      return getAuth<TData>(path); // Retry
    }
    localStorage.removeItem("accessToken");
    throw new Error("Session expired. Please sign in again.");
  }

  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message ?? "Something went wrong");
  }
  return result.data;
}
```

### C. Form Validation with React Hook Form & Zod
Forms use Zod for validation, ensuring user errors are captured locally before hitting the server. For example, `app/pages/auth/sign-in-page.tsx`:
```tsx
const form = useForm<SignInFormData>({
  resolver: zodResolver(signInSchema),
  defaultValues: { email: "", password: "" },
});

const handleOnSubmit = async (values: SignInFormData) => {
  try {
    const data = await postAuth("/api/auth/sign-in", values);
    localStorage.setItem("accessToken", data.accessToken);
    toast.success("Login successful");
    navigate("/");
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Something went wrong");
  }
};
```

---

## 6. Styling, Theming & Responsiveness

1. **Typography**: The Geist font is loaded for modern look and feel, and Google Fonts Inter is imported in `app/root.tsx` for optimal readability.
2. **Glassmorphism**: The header utilizes:
   `className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl"`
   This keeps the navbar visually elevated during scrolls.
3. **Animations**: Elements incorporate classes like `transition-all duration-300`, `hover:-translate-y-2`, and entry animations like `animate-in fade-in duration-500` to make the application feel highly interactive and premium.
