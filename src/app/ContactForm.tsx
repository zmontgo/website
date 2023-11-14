"use client";

import { useState } from 'react';
import { ArrowPathIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import { Koulen } from 'next/font/google';

const koulen = Koulen({
  subsets: ['latin'],
  weight: ['400'],
})

export default function ContactForm({ id }: { id: string }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    fax: '',
    message: '',
  })

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    fax: '',
    message: '',
  })

  const [formSuccess, setFormSuccess] = useState(false);
  const [formFailure, setFormFailure] = useState(false);
  const [loading, setLoading] = useState(false);

  // If we ever wanted to do something while the form is being filled out, we could use this.
  async function updateForm(key: string, value: string) {
    setForm({ ...form, [key]: value });
  }

  function areAllStringValuesEmpty(obj: { [key: string]: string }) {
    return Object.values(obj).every(value => typeof value === 'string' && value.trim() === '');
  }

  async function submit() { 
    setLoading(true);
    setFormErrors({
      name: '',
      email: '',
      fax: '',
      message: '',
    });


    try {
    if (form.name.length === 0) {
      setFormErrors({ ...formErrors, name: 'Please enter your name.' })
    }

    if (form.email.length === 0) {
      setFormErrors({ ...formErrors, email: 'Please enter your email.' })
    }

    if (form.message.length === 0) {
      setFormErrors({ ...formErrors, message: 'Please enter a message.' })
    }

    if (!areAllStringValuesEmpty(formErrors)) {
      return;
    }

      const body = {
        id,
        ...form
      }

      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await resp.json();

      if (data.success) {
        setFormSuccess(true);
      } else {
        setFormFailure(true);
      }
    } catch (e) {
      console.error(e);
      
      setFormFailure(true);
    } finally {
      setLoading(false);
    }
  }

  if (formSuccess) {
    return (
      <>
        <div className='flex mt-6 items-center justify-center gap-4'>
          <span className={"text-4xl tracking-wider text-center " + koulen.className}>&bull;</span>
          <span className={"text-4xl tracking-wider text-center max-w-[12rem] " + koulen.className}>Success</span>
          <span className={"text-4xl tracking-wider text-center " + koulen.className}>&bull;</span>
        </div>
        <div className="w-8 border-b-2 border-secondary mt-8 mb-6"></div>
        <div className='flex gap-4 flex-wrap'>
          <p className="max-w-lg">Your message was sent successfully, and is being sent by the fastest carrier pigeon available. Thank you for reaching out.</p>
        </div>
      </>
    )
  }


  return (
    <>
      <div className='flex mt-6 items-center justify-center gap-4'>
        <span className={"text-4xl tracking-wider text-center " + koulen.className}>&bull;</span>
        <span className={"text-4xl tracking-wider text-center max-w-[12rem] " + koulen.className}>Let&apos;s Work Together</span>
        <span className={"text-4xl tracking-wider text-center " + koulen.className}>&bull;</span>
      </div>
      <div className="w-8 border-b-4 border-secondary mt-8 mb-6"></div>
      <div className='flex gap-4 flex-wrap'>
        { formFailure && <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>An error occurred while sending your message. Please try again later.</span>
        </div> }
        <div className="relative flex-grow basis-64 form-control">
          <label htmlFor="name" className="label">
            <span className="label-text">My Name Is</span>
          </label> 
          <input disabled={loading} type="text" name="name" id="name" className="input input-bordered border-secondary/30 hover:border-secondary/40 focus:border-secondary/70 transition-all border-2 border-dashed bg-transparent w-full" required onChange={e => updateForm(e.target.name, e.target.value)} />
          { formErrors.name.length > 0 && <p className="text-error">{formErrors.name}</p> }
        </div>
        <div className="relative flex-grow basis-64">
          <label htmlFor="email" className="label">
            <span className="label-text">My E-Mail Is</span>
          </label>
          <input disabled={loading} type="email" name="email" id="email" className={`input input-bordered border-secondary/30 hover:border-secondary/40 focus:border-secondary/70 transition-all border-2 border-dashed bg-transparent w-full`} required onChange={e => updateForm(e.target.name, e.target.value)} />
          { formErrors.email.length > 0 && <p className="text-error">{formErrors.email}</p> }
        </div>
        <div className="relative hidden">
          { /* This is a honeypot field. If it's filled out, the form is assumed to be spam. */ }
          <label htmlFor="fax" className="label">
            <span className="label-text">My Fax Is</span>
          </label>
          <input disabled={loading} type="text" className={`input input-bordered border-secondary/30 hover:border-secondary/40 focus:border-secondary/70 transition-all border-2 border-dashed bg-transparent w-full`} name="fax" id="fax" onChange={e => updateForm(e.target.name, e.target.value)} tabIndex={-1} />
          { formErrors.fax.length > 0 && <p className="text-error">{formErrors.fax}</p> }
        </div>
        <div className="relative w-full form-control">
          <label htmlFor="message" className="label">
            <span className="label-text">I&apos;d Like To Chat About</span>
          </label>
          <textarea name="message" id="message" cols={30} rows={5} required onChange={e => updateForm(e.target.name, e.target.value)} className={`textarea textarea-bordered border-secondary/30 hover:border-secondary/40 focus:border-secondary/70 transition-all border-2 border-dashed bg-transparent w-full`} />
          { formErrors.message.length > 0 && <p className="text-error">{formErrors.message}</p> }
        </div>
        <button disabled={loading} className="btn btn-secondary normal-case" onClick={submit}>
          
          { loading
            ? <>
                Sending... <ArrowPathIcon className='w-4 h-4 animate-spin' strokeWidth={2.5} />
              </>
            : <>
                Send Message <ArrowRightIcon className='w-4 h-4' strokeWidth={2.5} />
              </>}
        </button>

      </div>
    </>
  );
}