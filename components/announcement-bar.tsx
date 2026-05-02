export function AnnouncementBar() {
  return (
    <div
      role="region"
      aria-label="Promotion"
      className="bg-ink text-cream-100"
    >
      <div className="container-wide flex h-9 items-center justify-center text-center">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest">
          Get 15% off your order with code{" "}
          <span className="font-mono font-bold text-cream-50">WELCOME15</span>
        </p>
      </div>
    </div>
  );
}
