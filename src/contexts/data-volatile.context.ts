import { createContext } from "preact";
import { DataContextType } from "./data.context";

export type DataVolatileContextType = Partial<DataContextType>;

export const DataVolatileContext = createContext<DataVolatileContextType>({});
