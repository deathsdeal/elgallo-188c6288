import type { SVGProps } from "react";

export function Flourish({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 320 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path
        d="M2 20 C 40 20, 60 4, 100 20 C 130 32, 150 4, 160 20 C 170 36, 190 8, 220 20 C 260 36, 280 20, 318 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M150 20 l10 -6 l10 6 l-10 6 z"
        fill="currentColor"
      />
      <circle cx="20" cy="20" r="2.5" fill="currentColor" />
      <circle cx="300" cy="20" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function CornerHeart({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path d="M12 21s-8-4.9-8-11.1C4 6.6 6.6 4 9.9 4c1.7 0 3.2.8 4.1 2 .9-1.2 2.4-2 4.1-2C21.4 4 24 6.6 24 9.9 24 16.1 12 21 12 21z" />
    </svg>
  );
}

export function Divider({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path d="M0 6 H80" stroke="currentColor" strokeWidth="1.5" />
      <path d="M120 6 H200" stroke="currentColor" strokeWidth="1.5" />
      <path d="M100 1 l6 5 l-6 5 l-6 -5 z" fill="currentColor" />
    </svg>
  );
}