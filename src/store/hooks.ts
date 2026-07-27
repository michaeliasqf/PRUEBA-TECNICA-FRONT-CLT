import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";

// Hooks tipados para no repetir AppDispatch y RootState en cada componente.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
