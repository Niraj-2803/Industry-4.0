export function Dialog({ children }) {
  return <div className="p-4 bg-gray-800 text-white rounded-md">{children}</div>;
}

export function DialogContent({ children }) {
  return <div className="p-4 bg-gray-900 text-white rounded-md shadow-md">{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="p-2 border-b border-gray-700 font-bold">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function DialogDescription({ children }) {
  return <p className="text-gray-400 text-sm">{children}</p>;
}

export function DialogClose({ onClose, children }) {
  return (
    <button onClick={onClose} className="text-gray-400 text-sm hover:text-gray-200">
      {children}
    </button>
  );
}
