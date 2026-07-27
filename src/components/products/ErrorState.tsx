import { CircleAlert, RotateCcw } from "lucide-react";

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    // role="alert" permite anunciar el error cuando aparece.
    <div className="errorState" role="alert">
      <CircleAlert size={30} aria-hidden />
      <div><h2>Algo salió mal</h2><p>{message}</p></div>
      {/* El padre decide qué petición repetir mediante la prop onRetry. */}
      <button className="secondaryButton" type="button" onClick={onRetry}>
        <RotateCcw size={17} aria-hidden /> Reintentar
      </button>
    </div>
  );
}
