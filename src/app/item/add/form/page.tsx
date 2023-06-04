"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import FileUploadForm from "@/components/Form/FileUploadComponent";
import TextInput from "@/components/Form/TextInput";
import baseURL from "@/utils/url";
import useUserStore from "@/utils/useUserStore";

type FormData = {
  image: string;
  name: string;
  desc: string;
  link: string;
};

export default function Form() {
  const router = useRouter();

  const session = useUserStore((state) => state.session);

  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");

  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function onDescChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setDesc(event.target.value);
  }

  function onLinkChange(event: ChangeEvent<HTMLInputElement>) {
    setLink(event.target.value);
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setFile(event.target.files[0]);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!file || !name || !desc || !link) {
      return alert("Fill out all elements of the form");
    }
    console.log(file);
    readFile(file as File)
      .then((image) => uploadFile({ image, name, desc, link }))
      .catch((err) => console.error(err));
    // Do something with the file, such as upload it to a server
  };

  const uploadFile = async (formData: FormData) => {
    const res = await fetch(`${baseURL()}/add`, {
      method: "POST",
      body: JSON.stringify({ formData, session }),
    });

    const data = await res.json();

    if (data.id) {
      router.push(`/item/${data.id}`);
    }

    if (data.error) {
      alert("FAILED: Check console ");
      console.error(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        onChange={onNameChange}
        labelName="name"
        labelContent="Set name"
      />
      <label htmlFor="message">Message:</label>
      <textarea
        onChange={onDescChange}
        id="message"
        name="message"
        rows={5}
      ></textarea>
      <TextInput
        onChange={onLinkChange}
        labelName="link"
        labelContent="Set purchase link"
      />
      <FileUploadForm handleFileChange={handleFileChange} />
      <button type="submit">Upload new item</button>
    </form>
  );
}

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      // The result property contains the contents of the file
      const content = reader.result as string;
      resolve(content);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    // Read the file as text
    reader.readAsDataURL(file);
  });
}
