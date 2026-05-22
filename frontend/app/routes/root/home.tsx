import type { Route } from "../../+types/root";
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
  return (
    <main className="min-h-screen bg-white">
    </main>
  );
}
