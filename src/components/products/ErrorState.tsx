import { CircleAlert, RotateCcw } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="errorState" role="alert">
      <CircleAlert size={30} aria-hidden />
      <div>
        <h2>Algo salió mal</h2>
        <p>{message}</p>
      </div>
      {/* El catálogo decide qué petición repetir mediante la prop onRetry. */}
      <button className="secondaryButton" type="button" onClick={onRetry}>
        <RotateCcw size={17} aria-hidden />
        Reintentar
      </button>
    </div>
  );
}
