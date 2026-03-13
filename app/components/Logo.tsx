export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M55 6 L104 92 H84 L55 40 L26 92 H6 Z" fill="none" stroke="#0A2463" strokeWidth="8" strokeLinejoin="miter"/>
      <path d="M30 70 H80" stroke="#0A2463" strokeWidth="8" strokeLinecap="square"/>
      <path d="M69 92 H100 L90 70 H80" fill="none" stroke="#0A2463" strokeWidth="8" strokeLinejoin="miter" strokeLinecap="square"/>
    </svg>
  );
}
