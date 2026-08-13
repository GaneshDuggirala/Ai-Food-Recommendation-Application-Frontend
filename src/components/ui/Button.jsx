export function Button({ children, variant = 'primary', className = '', style = {}, onClick, ...props }) {
  const variantClass = variant ? `btn-${variant}` : '';
  return (
    <button
      className={`btn ${variantClass} ${className}`.trim()}
      style={style}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
