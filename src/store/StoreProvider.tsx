"use client";

import { useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/store/store";

export function StoreProvider({ children }: { children: ReactNode }) {
  // useState conserva la misma instancia de Redux entre renderizados.
  const [store] = useState<AppStore>(makeStore);

  return <Provider store={store}>{children}</Provider>;
}
