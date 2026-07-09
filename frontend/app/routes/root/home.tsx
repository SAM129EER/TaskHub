import HomePage from "@/pages/home/home-page";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskHub - Modern Task Management" },
    {
      name: "description",
      content: "Welcome to TaskHub, the modern task management platform!",
    },
  ];
}

export default function Home() {
  return <HomePage />;
}
