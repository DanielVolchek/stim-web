type Props = {
  onClick: () => void;
  innerText: string;
  className?: string;
};

export default function AuthButtonWrapper({
  onClick,
  innerText,
  className,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`rounded-3xl border-ebony bg-alabaster px-12 py-2 text-copper transition-all hover:-translate-y-[6px] hover:shadow-md hover:shadow-slate-600 ${className}`}
    >
      {innerText}
    </button>
  );
}
