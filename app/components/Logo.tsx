interface LogoProps {
  size?: number;
  variant?: "primary" | "reversed" | "bare";
}

export default function Logo({ size = 36, variant = "primary" }: LogoProps) {
  const bg =
    variant === "primary"  ? "#EBF1FF" :
    variant === "reversed" ? "#0A2463" :
    "transparent";

  const fill  = variant === "primary"  ? "#0A2463" : "white";
  const cut   = variant === "primary"  ? "#EBF1FF" : "#0A2463";

  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {variant !== "bare" && <rect width="72" height="72" rx="18" fill={bg} />}
      <path
        d="M20 18H36C40.42 18 44 21.58 44 26C44 28.32 42.98 30.4 41.36 31.84C43.62 33.24 45.2 35.78 45.2 38.72C45.2 43.92 40.96 48 35.68 48H20V18Z"
        fill={fill}
      />
      <rect x="27.5" y="18" width="2" height="30" fill={cut} />
      <rect x="27.5" y="33" width="12.5" height="2" fill={cut} />
    </svg>
  );
}
