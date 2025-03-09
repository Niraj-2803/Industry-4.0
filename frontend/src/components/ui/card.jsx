export function Card({ children }) {
    return <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md">{children}</div>;
  }
  
  export function CardHeader({ children }) {
    return <div className="p-2 border-b border-gray-700 font-bold">{children}</div>;
  }
  
  export function CardTitle({ children }) {
    return <h2 className="text-lg font-semibold">{children}</h2>;
  }
  
  export function CardContent({ children }) {
    return <div className="p-2">{children}</div>;
  }
  
  export function CardFooter({ children }) {
    return <div className="p-2 border-t border-gray-700">{children}</div>;
  }
  