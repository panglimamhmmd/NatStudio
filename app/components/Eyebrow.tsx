export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
      <span className="h-px w-6 bg-accent" aria-hidden="true" />
      {children}
    </p>
  );
}
