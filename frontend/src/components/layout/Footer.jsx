import React from 'react';

const Footer = () => {
    return (
      <div>
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
                  <path
                    d="M12 0C5.372 0 0 5.373 0 12c0 5.302 
              3.438 9.8 8.207 11.387.6.111.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 
              1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 
              1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 
              0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 
              0 0 1.008-.322 3.301 1.23.957-.266 
              1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 
              2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 
              2.874.118 3.176.77.84 1.235 1.911 1.235 
              3.221 0 4.609-2.807 5.624-5.479 
              5.921.43.372.823 1.102.823 2.222v3.293c0 
              .319.192.694.801.576C20.565 21.798 
              24 17.301 24 12c0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/tayyab2627"
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
                  <path
                    d="M22.675 0H1.325C.593 0 0 
              .593 0 1.326v21.348C0 23.406.593 
              24 1.325 24h11.49v-9.294H9.692V11.01h3.123V8.414c0-3.1 
              1.894-4.788 4.659-4.788 1.325 0 
              2.466.099 2.798.143v3.24l-1.922.001c-1.506 
              0-1.797.716-1.797 1.765v2.313h3.587l-.467 
              3.696h-3.12V24h6.116C23.407 24 24 
              23.407 24 22.674V1.326C24 
              .593 23.407 0 22.675 0z"
                  />
                </svg>
              </a>
            </nav>
          </div>
        </footer>
      </div>
    );
};

export default Footer;