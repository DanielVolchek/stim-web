type Props = {
  onClick: () => void;
  innerText: string;
};

export default function AuthButtonWrapper({ onClick, innerText }: Props) {
  return (
    <button onClick={onClick} className="">
      {innerText}
    </button>
  );
}
