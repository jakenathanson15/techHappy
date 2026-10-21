export function TechHappyEmblem({
  className = "h-5 w-5",
  eyesColor = "#f8fafc",
  smileColor = "#10b981",
  strokeWidth = 2.5,
}: {
  className?: string;
  eyesColor?: string;
  smileColor?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 
        techHappy 'T & H' Eyes Smile Emblem:
        - Left Eye: Stylized geometric 'T' (White)
        - Right Eye: Stylized geometric 'H' (White)
        - Smile: Radiant uplifting emerald arc beneath the eyes (#10b981)
      */}

      {/* Left Eye: Geometric 'T' */}
      <path
        d="M4.5 6.5H10.5"
        stroke={eyesColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M7.5 6.5V12"
        stroke={eyesColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Right Eye: Geometric 'H' */}
      <path
        d="M14 6.5V12"
        stroke={eyesColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M19.5 6.5V12"
        stroke={eyesColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M14 9.25H19.5"
        stroke={eyesColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Uplifting smile curve underneath both T & H eyes */}
      <path
        d="M5 16C7.5 19.5 16.5 19.5 19 16"
        stroke={smileColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TechHappyLogo({ className = "h-5 w-5" }: { className?: string }) {
  return <TechHappyEmblem className={className} />;
}
