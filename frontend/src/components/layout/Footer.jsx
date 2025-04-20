import React from 'react';

const Footer = () => {
    return (
      <footer className="bg-neutral text-neutral-content p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <aside className="text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} - All rights reserved</p>
          </aside>
          <nav className="flex gap-4 justify-center sm:justify-end">
            <a
              href="https://github.com/tayyab011"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12..." />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/tayyab2627?rdid=JwO8ZH07z5avzWrT&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1KarL3hREi%2F"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642..."></path>
              </svg>
            </a>
          </nav>
        </div>
      </footer>
    );
};

export default Footer;