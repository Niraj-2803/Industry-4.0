export function Select({ children }) {
  return <div className="relative w-full">{children}</div>;
}

export function SelectTrigger({ children, onClick }) {
  return (
    <div className="p-2 border border-gray-600 rounded-md bg-gray-800 text-white cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
}

export function SelectContent({ children }) {
  return <div className="absolute w-full bg-gray-900 text-white border border-gray-700 rounded-md">{children}</div>;
}

export function SelectItem({ children, onClick }) {
  return (
    <div className="p-2 hover:bg-gray-700 cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
}

export function SelectValue({ children }) {
  return <span className="text-white">{children}</span>;
}
