import { usePathname } from "next/navigation";

export function useActivePath(): (path: string) => boolean {
  const pathname = usePathname();

  const isActivePath = (path: string) => {
    if (path === "/" && pathname !== path) {
      return false;
    }
    return pathname.startsWith(path);
  };

  return isActivePath;
}
