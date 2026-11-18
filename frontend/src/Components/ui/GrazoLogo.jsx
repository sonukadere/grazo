import { useId } from "react";

export default function GrazoLogo({ className = "w-11 h-11 md:w-12 md:h-12" }) {
  const uid = useId().replace(/:/g, "");
  const goldId = `gbGold-${uid}`;
  const bgId = `gbBg-${uid}`;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Grazo Bites Monogram Logo"
    >
      <defs>
        <linearGradient id={goldId} x1="12" y1="10" x2="88" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F0DBA5" />
          <stop offset="50%" stopColor="#C9A24D" />
          <stop offset="100%" stopColor="#9C7426" />
        </linearGradient>
        <radialGradient id={bgId} cx="35%" cy="25%" r="75%">
          <stop offset="0%" stopColor="#6E2228" />
          <stop offset="65%" stopColor="#4A1418" />
          <stop offset="100%" stopColor="#260A0D" />
        </radialGradient>
      </defs>

      {/* Luxury Circular Medallion Base */}
      <circle cx="50" cy="50" r="48" fill={`url(#${bgId})`} />

      {/* Outer & Inner Hairline Gold Rings */}
      <circle cx="50" cy="50" r="46" stroke={`url(#${goldId})`} strokeWidth="2.2" />
      <circle cx="50" cy="50" r="41" stroke={`url(#${goldId})`} strokeWidth="0.8" strokeOpacity="0.6" />

      {/* Minimal Botanical Pure-Veg Leaf Crest */}
      <path
        d="M50 23C50 23 43.5 20.5 41.5 14.5C47.5 14.5 50 19.5 50 23Z"
        fill={`url(#${goldId})`}
      />
      <path
        d="M50 23C50 23 56.5 20.5 58.5 14.5C52.5 14.5 50 19.5 50 23Z"
        fill={`url(#${goldId})`}
      />
      <circle cx="50" cy="25.5" r="1.2" fill={`url(#${goldId})`} />

      {/* Editorial Serif "GB" Monogram */}
      <text
        x="50"
        y="61.5"
        textAnchor="middle"
        fill={`url(#${goldId})`}
        fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="36"
        letterSpacing="-1.5"
      >
        GB
      </text>

      {/* Subtle Bottom Accent Divider */}
      <path
        d="M35 73.5H65"
        stroke={`url(#${goldId})`}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.75"
      />
      <circle cx="50" cy="79" r="1.6" fill={`url(#${goldId})`} />
    </svg>
  );
}
