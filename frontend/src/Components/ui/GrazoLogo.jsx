import grazoLogoSquare from "../curated/grazo-logo-square.png";
import grazoLogoFull from "../curated/grazo-logo-full.png";

/**
 * GrazoLogo Component
 * Renders the official Grazo Bites brand emblem or full lockup logo.
 *
 * @param {Object} props
 * @param {string} [props.className] - Sizing and layout styling
 * @param {"mark" | "full" | "raw"} [props.variant="mark"] - Display format
 * @param {string} [props.alt="Grazo Bites Logo"] - Accessibility description
 */
export default function GrazoLogo({
  className = "w-11 h-11 md:w-12 md:h-12",
  variant = "mark",
  alt = "Grazo Bites Logo",
}) {
  if (variant === "full") {
    return (
      <img
        src={grazoLogoFull}
        alt={alt}
        className={`${className} object-contain`}
        loading="eager"
      />
    );
  }

  if (variant === "raw") {
    return (
      <img
        src={grazoLogoSquare}
        alt={alt}
        className={`${className} object-contain`}
        loading="eager"
      />
    );
  }

  // Default "mark": Circular luxury medallion with cream background & warm gold rim
  return (
    <div
      className={`relative rounded-full overflow-hidden bg-[#EFEEEA] border border-[#C9A24D]/50 ring-1 ring-[#C9A24D]/25 shadow-md flex items-center justify-center flex-shrink-0 ${className}`}
      role="img"
      aria-label={alt}
    >
      <img
        src={grazoLogoSquare}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover select-none pointer-events-none scale-[1.02]"
        loading="eager"
      />
    </div>
  );
}
