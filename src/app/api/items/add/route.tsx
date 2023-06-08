import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import { decode } from "base64-arraybuffer";

import prisma from "@/utils/prisma";
import { authenticationFlow } from "@/utils/auth";
import supabase from "@/utils/Supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  //
  // const { session } = body;
  //
  // let user;
  // try {
  //   user = await authenticationFlow(session);
  //   if (user.role !== "ADMIN") throw new Error("Admin privileges required");
  // } catch (err) {
  //   return NextResponse.json(
  //     { error: `Unauthorized: ${err}` },
  //     { status: 400 }
  //   );
  // }
  //
  // const { file: image, name, desc, link } = body.formData;
  //
  // const getMissingData = (data: {
  //   image: string;
  //   name: string;
  //   desc: string;
  //   link: string;
  // }) => {
  //   let missingData = "";
  //
  //   for (let [key, value] of Object.entries(data)) {
  //     if (!value) missingData += `${key},`;
  //   }
  //
  //   return missingData.substring(0, missingData.length - 1);
  // };
  //
  // if (!image || !name || !desc || !link) {
  //   return NextResponse.json(
  //     { error: "Missing data: " + getMissingData({ image, name, desc, link }) },
  //     { status: 400 }
  //   );
  // }
  //
  // // add item
  // // convert image to Image
  //
  // const res = await uploadFile(generateImageName(name), image);
  const res = { data: "hello", error: "boo" };

  if (res.data) {
    return NextResponse.json(
      { message: "Success", data: res.data },
      { status: 200 }
    );
  }
  //
  // return NextResponse.json({ error: res.error }, { status: 400 });
  //
  // // upload to supabase
  // // get url
  // // upload via prisma
}

// Upload the file via API
async function uploadFile(fileName: string, base64: string) {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`public/${fileName}`, decode(base64), { contentType: "image/png" });
  if (error) {
    return { error };
  } else {
    return { data };
  }
}
