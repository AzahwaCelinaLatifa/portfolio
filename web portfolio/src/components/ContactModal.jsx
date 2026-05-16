import React from 'react';

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Blur / Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div className="relative w-full max-w-4xl bg-white text-black p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12 font-mono">
        {/* Tombol Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-6 text-2xl font-bold hover:rotate-90 transition-transform duration-300"
        >
          + {/* Menggunakan plus sebagai X saat di-rotate */}
        </button>

        {/* Bagian Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold uppercase mb-6 tracking-widest border-b-2 border-black pb-2">
            Get In Touch
          </h2>
          <div className="space-y-6 text-sm uppercase">
            <div>
              <p className="opacity-50 text-xs mb-1">Email</p>
              <a href="mailto:hello@acel.com" className="hover:underline">hello@acel.com</a>
            </div>
            <div>
              <p className="opacity-50 text-xs mb-1">Phone</p>
              <p>+62 812 3456 7890</p>
            </div>
            <div>
              <p className="opacity-50 text-xs mb-1">Socials</p>
              <div className="flex gap-4">
                <a href="#" className="hover:underline">Instagram</a>
                <a href="#" className="hover:underline">LinkedIn</a>
                <a href="#" className="hover:underline">GitHub</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Form */}
        <div className="flex-1">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase opacity-70">Name</label>
              <input type="text" className="border-b border-black bg-transparent py-2 outline-none focus:border-b-4 transition-all" placeholder="YOUR NAME" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase opacity-70">Email</label>
              <input type="email" className="border-b border-black bg-transparent py-2 outline-none focus:border-b-4 transition-all" placeholder="YOUR EMAIL" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase opacity-70">Message</label>
              <textarea rows="3" className="border-b border-black bg-transparent py-2 outline-none focus:border-b-4 transition-all resize-none" placeholder="YOUR MESSAGE"></textarea>
            </div>
            <button className="bg-black text-white py-4 mt-2 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
              Send Message ↗
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;