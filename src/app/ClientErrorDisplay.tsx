"use client";

import useErrorStore from "@/utils/useStore";
import { MouseEventHandler } from "react";

export default function ClientErrorDisplay() {
  const { error, updateError } = useErrorStore();

  if (error) {
    return (
      <ErrorModalComponent error={error} resetError={() => updateError("")} />
    );
  } else {
    return null;
  }
}

const ErrorModalComponent = ({
  error,
  resetError,
}: {
  error: string;
  resetError: () => void;
}) => {
  const close: MouseEventHandler<HTMLElement> = () => {
    resetError();
  };

  const onInnerClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  return (
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
        <h1 className="text-4xl">ERROR: </h1>
        <span className="text-2xl">{error}</span>
      </div>
    </div>
  );
};
