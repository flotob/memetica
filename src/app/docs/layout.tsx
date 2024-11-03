import { DocsNav } from "./components/docs-nav";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-8">
      <div className="flex gap-12">
        <aside className="w-64 flex-shrink-0">
          <DocsNav />
        </aside>
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
} 