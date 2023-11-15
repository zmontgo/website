"use client";

import { addSubcriber } from "@/app/lib/subscriber";
import { ArrowPathIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useFormStatus, useFormState } from "react-dom";

const initialState = {
  message: "",
  success: false,
}

export default function Subscribe() {
  const [state, formAction] = useFormState(addSubcriber, initialState)

  return (
    <form action={formAction} className="my-6 max-w-sm">
      { state?.message && !state?.success && 
        <div className="alert alert-error mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{state.message}</span>
        </div> }
      { state?.success &&
        <div className="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Thank you for subscribing!</span>
        </div> }
      { !state?.success && 
      <>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              className="input border-secondary/30 hover:border-secondary/40 focus:border-secondary/70 transition-all border-2 border-dashed bg-transparent w-full max-w-sm"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              className="input border-secondary/30 hover:border-secondary/40 focus:border-secondary/70 transition-all border-2 border-dashed bg-transparent w-full max-w-sm"
            />
          </div>
        </div>
        <div className="mb-4 hidden">
          <label
            htmlFor="fax"
            className="block text-sm font-medium text-gray-700"
          >
            Fax
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="fax"
              id="fax"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <SubmitButton />
        </div>
      </> }
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="btn btn-primary w-max normal-case flex flex-row gap-2 items-center"
    >
      Subscribe
      { pending 
        ? <ArrowPathIcon className="h-4 w-4 animate-spin" strokeWidth={2.5} />
        : <ArrowRightIcon className="h-4 w-4" strokeWidth={2.5} /> }
    </button>
  )
}

export const dynamic = "force-dynamic";