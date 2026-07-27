import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";

// Hooks tipados para usar Redux con autocompletado dentro de los componentes.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
