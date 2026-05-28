import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "../api/client";
import { fadeUpSmall } from "../utils/motion";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");

    try {
      await api.submitContact({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        phone: data.get("phone"),
        message: data.get("message"),
      });
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      alert(err.message || "Could not send message. Please try again.");
    }
  };

  return (
    <div className="p-6 md:p-12 rounded-md shadow-lg bg-white min-h-[420px]">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center text-center py-16 px-4"
          >
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-slate-900">Message sent!</h3>
            <p className="text-slate-500 mt-3 max-w-sm leading-7">
              Thank you for reaching out. Our team will get back to you shortly.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="btn-motion mt-8 py-2 px-6 rounded-md text-white bg-primary hover:bg-primaryDark font-medium"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { id: "formFirstName", name: "firstName", label: "First Name", placeholder: "Your first name...", type: "text", required: true },
                { id: "formLastName", name: "lastName", label: "Last Name", placeholder: "Your last name...", type: "text", required: true },
                { id: "formEmail", name: "email", label: "Email Address", placeholder: "Your email...", type: "email", required: true },
                { id: "formPhone", name: "phone", label: "Phone Number", placeholder: "Type phone number...", type: "text", required: false },
              ].map((field, index) => (
                <motion.div
                  key={field.id}
                  variants={fadeUpSmall}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.11 }}
                  className={field.name === "phone" ? "" : ""}
                >
                  <label htmlFor={field.id} className="block text-sm/normal font-semibold text-black mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.id}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="block w-full text-sm rounded-md py-3 px-4 border border-gray-200 focus:border-gray-300 focus:ring-transparent transition-colors duration-300"
                  />
                </motion.div>
              ))}

              <motion.div
                className="sm:col-span-2"
                variants={fadeUpSmall}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.42 }}
              >
                <label htmlFor="formMessages" className="block text-sm/normal font-semibold text-black mb-2">
                  Messages
                </label>
                <textarea
                  name="message"
                  id="formMessages"
                  rows="4"
                  placeholder="Type messages..."
                  required
                  className="block w-full text-sm rounded-md py-3 px-4 border border-gray-200 focus:border-gray-300 focus:ring-transparent transition-colors duration-300"
                />
              </motion.div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-motion inline-flex items-center gap-2 py-2 px-6 rounded-md text-base text-white bg-primary hover:bg-primaryDark border border-primary font-medium disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <svg className="h-5 w-5 animate-spin-slow" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>Send Messages</>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
