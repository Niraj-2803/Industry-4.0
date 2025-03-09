// src/components/ui/dialog.jsx
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

// src/components/ui/tabs.jsx
export function Tabs({ children }) {
  return <div className="flex space-x-2 border-b border-gray-700">{children}</div>;
}

export function TabsList({ children }) {
  return <div className="flex space-x-2">{children}</div>;
}

export function TabsTrigger({ children, onClick }) {
  return (
    <button className="px-4 py-2 bg-gray-700 text-white rounded-md" onClick={onClick}>
      {children}
    </button>
  );
}

export function TabsContent({ children }) {
  return <div className="p-4 bg-gray-900 text-white rounded-md">{children}</div>;
}