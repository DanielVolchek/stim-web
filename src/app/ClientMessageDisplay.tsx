"use client";

import Popup from "@/components/Popup";
import useClientMessageStore from "@/utils/useClientMessageStore";

export default function ClientMessageDisplay() {
  const { clientMessage, updateClientMessage } = useClientMessageStore();

  return clientMessage ? (
    <Popup onClose={() => updateClientMessage(undefined)} className="!z-20">
      <h1 className="text-4xl">{clientMessage.type}: </h1>
      <span className="text-2xl">{clientMessage.message}</span>
    </Popup>
  ) : null;
}
