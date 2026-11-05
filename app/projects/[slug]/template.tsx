// Re-mounts on every case-study navigation, so the CSS entrance replays per page.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
