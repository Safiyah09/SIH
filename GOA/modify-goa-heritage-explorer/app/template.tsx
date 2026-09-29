// A template re-mounts on every navigation, so the CSS entrance animation
// (see .route-enter in globals.css) plays as a subtle page transition.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-enter">{children}</div>
}
