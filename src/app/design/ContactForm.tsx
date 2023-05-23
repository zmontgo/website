"use client";

import { useState } from 'react';

import { Koulen } from 'next/font/google';

const koulen = Koulen({
  subsets: ['latin'],
  weight: ['400'],
})

function ContactFormWrapper({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="border-[3px] border-secondary mt-8 text-center p-8 flex flex-col items-center max-w-3xl">
      <span className={"mt-6 text-4xl tracking-wider " + koulen.className}>&bull; {title} &bull;</span>
      <div className="w-8 border-b-2 border-secondary mt-8 mb-6" />
      <div className='flex gap-4 flex-wrap'>
        {children}
      </div>
    </div>
  )
}

export default function ContactForm({ id }: { id: string }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    fax: '',
    subject: '',
    message: '',
  })

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    fax: '',
    subject: '',
    message: '',
  })

  const [formSuccess, setFormSuccess] = useState(false);
  const [formFailure, setFormFailure] = useState(false);

  // If we ever wanted to do something while the form is being filled out, we could use this.
  async function updateForm(key: string, value: string) {
    setForm({ ...form, [key]: value });
  }

  function areAllStringValuesEmpty(obj: { [key: string]: string }) {
    return Object.values(obj).every(value => typeof value === 'string' && value.trim() === '');
  }

  async function submit() { 
    if (form.name.length === 0) {
      setFormErrors({ ...formErrors, name: 'Please enter your name.' })
    }

    if (form.email.length === 0) {
      setFormErrors({ ...formErrors, email: 'Please enter your email.' })
    }

    if (form.subject.length === 0) {
      setFormErrors({ ...formErrors, subject: 'Please enter a subject.' })
    }

    if (form.message.length === 0) {
      setFormErrors({ ...formErrors, message: 'Please enter a message.' })
    }

    if (!areAllStringValuesEmpty(formErrors)) {
      return;
    }

    try {
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
    }
  }

  if (formSuccess) {
    return (
      <ContactFormWrapper title="Success">
        <p className="text-xl max-w-lg">Your message was sent successfully, and is being sent by the fastest carrier pigeon available. Thank you for reaching out.</p>
      </ContactFormWrapper>
    )
  }


  return (
    <ContactFormWrapper title="Get In Touch">
      { formFailure && <p className="text-red-500">There was an error sending your message. Please try again later.</p> }
      <div className="relative flex-grow basis-64">
        <label htmlFor="name" className={"absolute cursor-text text-secondary/70 top-3 uppercase " + (form.name.length > 0 ? 'hidden' : '')}>My Name Is</label> 
        <input type="text" name="name" id="name" className="bg-transparent border-b-2 border-dashed border-secondary py-3 focus:outline-none w-full" required onChange={e => updateForm(e.target.name, e.target.value)} />
        { formErrors.name.length > 0 && <p className="text-red-500">{formErrors.name}</p> }
      </div>
      <div className="relative flex-grow basis-64">
        <label htmlFor="email" className={"absolute cursor-text text-secondary/70 top-3 uppercase " + (form.email.length > 0 ? 'hidden' : '')}>My E-Mail Is</label>
        <input type="email" name="email" id="email" className="bg-transparent border-b-2 border-dashed border-secondary py-3 focus:outline-none w-full" required onChange={e => updateForm(e.target.name, e.target.value)} />
        { formErrors.email.length > 0 && <p className="text-red-500">{formErrors.email}</p> }
      </div>
      <div className="relative hidden">
        { /* This is a honeypot field. If it's filled out, the form is assumed to be spam. */ }
        <label htmlFor="fax" className={"absolute cursor-text text-secondary/70 top-3 uppercase " + (form.fax.length > 0 ? 'hidden' : '')}>My Fax Is</label>
        <input type="text" className="bg-transparent border-b-2 border-dashed border-secondary py-3 focus:outline-none w-full" name="fax" id="fax" onChange={e => updateForm(e.target.name, e.target.value)} />
        { formErrors.fax.length > 0 && <p className="text-red-500">{formErrors.fax}</p> }
      </div>
      <div className="relative w-full">
        <label htmlFor="subject" className={"absolute text-secondary/70 top-3 uppercase " + (form.subject.length > 0 ? 'hidden' : '')}>Subject Line</label>
        <input type="text" name="subject" id="subject" className="bg-transparent border-b-2 border-dashed border-secondary py-3 focus:outline-none w-full" required onChange={e => updateForm(e.target.name, e.target.value)} />
        { formErrors.subject.length > 0 && <p className="text-red-500">{formErrors.subject}</p> }
      </div>
      <div className="relative w-full">
        <label htmlFor="message" className={"absolute text-secondary/70 top-3 uppercase " + (form.message.length > 0 ? 'hidden' : '')}>I'd Like To Chat About</label>
        <textarea name="message" id="message" cols={30} rows={5} required onChange={e => updateForm(e.target.name, e.target.value)} className="bg-transparent border-b-2 border-dashed border-secondary py-3 focus:outline-none w-full" />
        { formErrors.message.length > 0 && <p className="text-red-500">{formErrors.message}</p> }
      </div>
      <button className={"transition py-3 px-6 border-2 " + (formFailure ? "border-secondary/60 text-secondary/60" : " border-secondary text-secondary hover:bg-secondary hover:text-white") } onClick={submit} disabled={id.length === 0 || formFailure}>Send Message</button>
    </ContactFormWrapper>
  );
}