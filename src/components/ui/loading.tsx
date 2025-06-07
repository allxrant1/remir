import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
}

export function Loading({ message = "Carregando..." }: LoadingProps) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center min-h-[200px]">
      <Loader2 className="h-8 w-8 animate-spin text-white/80 mb-4" />
      <p className="text-white/80 text-sm">{message}</p>
    </div>
  );
}
