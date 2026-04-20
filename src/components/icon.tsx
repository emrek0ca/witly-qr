export type IconName =
  | "arrow-right"
  | "chart"
  | "check"
  | "copy"
  | "dots"
  | "drag"
  | "edit"
  | "eye"
  | "grid"
  | "home"
  | "link"
  | "mail"
  | "menu"
  | "moon"
  | "palette"
  | "plus"
  | "qr"
  | "shield"
  | "settings"
  | "spark"
  | "switch"
  | "sun"
  | "table"
  | "trash"
  | "search"
  | "stack"
  | "user-check"
  | "x"
  | "users";

export function Icon({
  name,
  className = "size-4",
}: {
  name: IconName;
  className?: string;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "arrow-right":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M5 12h13" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M5 19V5" />
          <path d="M5 19h14" />
          <path d="m8 15 3-4 3 2 5-6" />
        </svg>
      );
    case "copy":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <rect x="8" y="8" width="10" height="10" rx="2" />
          <path d="M6 16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="m5 12 5 5L19 8" />
        </svg>
      );
    case "dots":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M6 12h.01" />
          <path d="M12 12h.01" />
          <path d="M18 12h.01" />
        </svg>
      );
    case "drag":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M9 5h.01" />
          <path d="M15 5h.01" />
          <path d="M9 12h.01" />
          <path d="M15 12h.01" />
          <path d="M9 19h.01" />
          <path d="M15 19h.01" />
        </svg>
      );
    case "edit":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M12 20h9" />
          <path d="m16.5 3.5 4 4L8 20l-5 1 1-5Z" />
        </svg>
      );
    case "eye":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
          <path d="M12 12a3 3 0 1 0 0.01 0Z" />
        </svg>
      );
    case "grid":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <rect x="4" y="4" width="6" height="6" rx="1.5" />
          <rect x="14" y="4" width="6" height="6" rx="1.5" />
          <rect x="4" y="14" width="6" height="6" rx="1.5" />
          <rect x="14" y="14" width="6" height="6" rx="1.5" />
        </svg>
      );
    case "home":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M6.5 10.5V20h11V10.5" />
        </svg>
      );
    case "link":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M10 14a3.5 3.5 0 0 1 0-5l2-2a3.5 3.5 0 0 1 5 5l-.8.8" />
          <path d="M14 10a3.5 3.5 0 0 1 0 5l-2 2a3.5 3.5 0 0 1-5-5l.8-.8" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="m5.5 8.5 6.5 5 6.5-5" />
        </svg>
      );
    case "menu":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>
      );
    case "moon":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M18 13a7 7 0 1 1-7-10 6 6 0 1 0 7 10Z" />
        </svg>
      );
    case "palette":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M12 4a8 8 0 1 0 8 8c0-1.7-1.2-3-2.9-3H15a2.5 2.5 0 0 1-2.5-2.5V6A2 2 0 0 0 12 4Z" />
          <path d="M7.5 11.5h.01" />
          <path d="M10.5 8.5h.01" />
          <path d="M15 8.5h.01" />
        </svg>
      );
    case "plus":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      );
    case "qr":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M4 4h6v6H4z" />
          <path d="M14 4h6v6h-6z" />
          <path d="M4 14h6v6H4z" />
          <path d="M14 14h2v2h-2z" />
          <path d="M18 14h2v6h-2z" />
          <path d="M14 18h2" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M12 4 19 7v5c0 4.5-2.7 7.8-7 9-4.3-1.2-7-4.5-7-9V7z" />
          <path d="m9 12 2 2 4-5" />
        </svg>
      );
    case "settings":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
          <path d="M19 12a7.3 7.3 0 0 0-.1-1l2-1.2-2-3.5-2.3.8a7.6 7.6 0 0 0-1.7-1L15 3h-6l-.9 2.1a7.6 7.6 0 0 0-1.7 1L4.1 5.3l-2 3.5 2 1.2A7.3 7.3 0 0 0 4 12c0 .3 0 .7.1 1l-2 1.2 2 3.5 2.3-.8a7.6 7.6 0 0 0 1.7 1L9 21h6l.9-2.1a7.6 7.6 0 0 0 1.7-1l2.3.8 2-3.5-2-1.2c.1-.3.1-.7.1-1Z" />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6Z" />
        </svg>
      );
    case "switch":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <rect x="3" y="8" width="18" height="8" rx="4" />
          <circle cx="9" cy="12" r="2.75" />
        </svg>
      );
    case "sun":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 3v2" />
          <path d="M12 19v2" />
          <path d="M3 12h2" />
          <path d="M19 12h2" />
          <path d="m5 5 1.5 1.5" />
          <path d="m17.5 17.5 1.5 1.5" />
          <path d="m19 5-1.5 1.5" />
          <path d="m5 19 1.5-1.5" />
        </svg>
      );
    case "table":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M4 9h16" />
          <path d="M7 9v11" />
          <path d="M17 9v11" />
          <rect x="6" y="4" width="12" height="5" rx="1.5" />
        </svg>
      );
    case "trash":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M4 7h16" />
          <path d="M9 7V5h6v2" />
          <path d="M7 7l1 13h8l1-13" />
          <path d="M10 11v5" />
          <path d="M14 11v5" />
        </svg>
      );
    case "search":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <circle cx="11" cy="11" r="5.5" />
          <path d="m16 16 4 4" />
        </svg>
      );
    case "stack":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="m4 8 8-4 8 4-8 4Z" />
          <path d="m4 12 8 4 8-4" />
          <path d="m4 16 8 4 8-4" />
        </svg>
      );
    case "user-check":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M14.5 11.5a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0Z" />
          <path d="M5 20a7 7 0 0 1 9.5-6.5" />
          <path d="m15.5 16.5 2 2 4-4" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="m6 6 12 12" />
          <path d="m18 6-12 12" />
        </svg>
      );
    case "users":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...common}>
          <path d="M15.5 10a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0Z" />
          <path d="M5 20a7 7 0 0 1 14 0" />
          <path d="M18 11a3 3 0 1 0-2.3-4.9" />
        </svg>
      );
  }
}
