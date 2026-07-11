import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // Public — landing page (no auth needed)
  index("routes/root/home.tsx"),

  // Guest routes — only for NOT logged-in users
  layout("components/guest-route.tsx", [
    layout("routes/auth/auth-layout.tsx", [
      route("sign-in", "routes/auth/sign-in.tsx"),
      route("sign-up", "routes/auth/sign-up.tsx"),
      route("forgot-password", "routes/auth/forgot-password.tsx"),
      route("reset-password", "routes/auth/reset-password.tsx"),
    ]),
  ]),

  // Verify email — accessible by both guests and logged-in users
  route("verify-email", "routes/auth/verify-email.tsx"),

  // Protected routes — only for logged-in users
  layout("components/protected-route.tsx", [
    route("dashboard", "routes/dashboard/index.tsx"),
  ]),
] satisfies RouteConfig;
