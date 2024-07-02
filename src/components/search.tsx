"use client";
import { useDebouncedCallback } from "use-debounce";
import { FaSearch } from "react-icons/fa";
import { Input } from "./ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathName}?${params.toString()}`);
  }, 300);
  return (
    <div className="relative">
      <FaSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 " />
      <Input
        type="search"
        placeholder="Search Post..."
        className="w-full bg-white shadow-none appearance-none pl-8 focus:ring-0 focus:border-gray-200"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
