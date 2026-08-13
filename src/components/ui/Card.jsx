
export function Card({ className = '', children, ...props }) {
  return (
    <div className={`card shadow-sm ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }) {
  return (
    <div className={`card-header bg-white py-3 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = '', children, ...props }) {
  return (
    <h5 className={`mb-0 fw-bold ${className}`.trim()} {...props}>
      {children}
    </h5>
  );
}

export function CardBody({ className = '', children, ...props }) {
  return (
    <div className={`card-body ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = '', children, ...props }) {
  return (
    <div className={`card-footer bg-white py-3 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
