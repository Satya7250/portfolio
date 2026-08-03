type LogoProps = {
  size?: number;
  className?: string;
};

export default function Logo({
  size = 48,
  className = "",
}: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Logo"
    >
      {/* Outer Circle */}
      <circle
        cx="50"
        cy="50"
        r="44"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Letter S */}
      <text
        x="50"
        y="50"
        dy="0.32em"
        textAnchor="middle"
        fontFamily="Inter, Poppins, sans-serif"
        fontSize="58"
        fontWeight="300"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        S
      </text>
    </svg>
  );
}