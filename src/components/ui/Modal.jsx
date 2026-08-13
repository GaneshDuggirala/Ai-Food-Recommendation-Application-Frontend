import { Card, CardHeader, CardTitle, CardBody } from './Card';

export function Modal({ isOpen, onClose, title, children, maxWidth = '600px' }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Standard Bootstrap Backdrop */}
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1040 }}
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ zIndex: 1050 }}
        onClick={(e) => {
          // If the user clicks on the gray background (outside the modal dialog), close it
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{ maxWidth }}>

          {/* We now use the reusable Card components instead of raw modal classes! */}
          <Card className="modal-content w-100 shadow-lg border-0 rounded-4">

            {title && (
              <CardHeader className="d-flex justify-content-between align-items-center bg-light border-bottom px-4 py-3 rounded-top-4">
                <CardTitle className="m-0" style={{ letterSpacing: '-0.025em' }}>{title}</CardTitle>
                <button type="button" className="btn-close focus-ring-none" onClick={onClose} aria-label="Close"></button>
              </CardHeader>
            )}

            {/* Using CardBody and adding modal-body so Bootstrap handles the scrolling perfectly */}
            <CardBody className="modal-body p-4">
              {children}
            </CardBody>

          </Card>

        </div>
      </div>
    </>
  );
}

