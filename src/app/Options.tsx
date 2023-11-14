"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Options() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  }

  return (
    <>
      <Link href="/" className="btn btn-primary normal-case btn-sm">Home</Link>
      <button onClick={goBack} className="btn btn-primary normal-case btn-sm">Go Back</button>
    </>
  )
}