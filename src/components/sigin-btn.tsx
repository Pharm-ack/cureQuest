"use client";

type SiginBtnProps = {
  onClick: () => void;
  children?: React.ReactNode;
};

export default function SiginBtn({ onClick, children }: SiginBtnProps) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
    >
      {children}
    </button>
  );
}
