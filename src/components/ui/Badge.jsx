// This uses Bootstrap's 'badge' and 'bg-secondary' classes to make a nice little tag for dietary info!
export function Badge({ children }) {
  return (
    // 'me-1' adds a small Margin to the End (right side) so they don't touch each other
    <span className="badge bg-secondary me-1">
      {children}
    </span>
  );
}
