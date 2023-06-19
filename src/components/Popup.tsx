import { MouseEventHandler, useState } from "react";

export default function ErrorModalComponent({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: Function;
}) {
  const [modalIsOpen, setOpen] = useState(true);

  const close: MouseEventHandler<HTMLElement> = () => {
    if (onClose) {
      onClose();
    }
    setOpen(false);
  };

  const onInnerClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  return modalIsOpen ? (
    <div
      onClick={close}
      className="absolute left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-gray-300 bg-opacity-90"
    >
      <div
        onClick={onInnerClick}
        className="relative z-20 w-1/4 bg-white opacity-100"
      >
        <button className="absolute right-0 top-0 text-xl" onClick={close}>
          X
        </button>
        {children}
      </div>
    </div>
  ) : null;
}
