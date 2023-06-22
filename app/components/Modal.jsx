import { IconClose, Link } from '~/components';
import { useState, useEffect, useRef } from 'react';

export function Modal({ children, cancelLink }) {
  const [isOpen, setIsOpen] = useState(true);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && ( 
        <div
          className="relative z-50"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          id="modal-bg"
        >
          <div
            className="fixed inset-0 transition-opacity bg-opacity-75 bg-primary/40"
            onClick={closeModal}
          ></div>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
              <div
                className="relative flex-1 px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform rounded shadow-xl bg-contrast sm:my-12 sm:flex-none sm:w-full sm:max-w-xl sm:p-6"
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onKeyPress={(e) => {
                  e.stopPropagation();
                }}
                tabIndex={0}
                ref={modalRef}
              >
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <Link
                    to={cancelLink}
                    className="p-4 -m-4 transition text-primary hover:text-primary/50"
                  >
                    <IconClose
                      aria-label="Close panel"
                      onClick={closeModal}
                    />
                  </Link>
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
