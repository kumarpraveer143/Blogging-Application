"use client";
import { useSession } from "next-auth/react";

export default function myPage() {
  const { data } = useSession();
  console.log(data?.user?.email);
  const email = data?.user?.email;
  return <>{email ? <>This is my blog page!</> : <></>}</>;
}
