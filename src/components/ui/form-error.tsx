import { HiExclamationTriangle } from "react-icons/hi2";

interface FormErrorProps {
  children: React.ReactNode;
}

export default function FormError({ children }: FormErrorProps) {
  return (
    <div className="rounded-md flex items-center gap-x-2 text-sm text-red-500 mt-1">
      <HiExclamationTriangle className="h-4 w-4" />
      <p className="flex items-center">{children}</p>
    </div>
  );
}
