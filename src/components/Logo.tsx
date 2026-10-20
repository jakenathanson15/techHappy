export function TechHappyEmblem({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 
        techHappy 'T & H' Eyes Smile Emblem:
        - Left Eye: Stylized geometric 'T'
        - Right Eye: Stylized geometric 'H'
        - Base: Confident, uplifting smile arc beneath the eyes
      */}
      
      {/* Left Eye: Geometric 'T' */}
      <path
        d="M4.5 6.5H10.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M7.5 6.5V12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Right Eye: Geometric 'H' */}
      <path
        d="M14 6.5V12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M19.5 6.5V12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M14 9.25H19.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Uplifting smile curve underneath both T & H eyes */}
      <path
        d="M5 16C7.5 19.5 16.5 19.5 19 16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TechHappyLogo({ className = "h-5 w-5" }: { className?: string }) {
  return <TechHappyEmblem className={className} />;
}
