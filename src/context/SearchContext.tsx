import { createContext, useState } from "react";
import {
  ISearchContext,
  SearchContextProvider,
} from "./contextRepositories/ISearchContext";

export const SearchContext = createContext({} as ISearchContext);

export function SearchContextProvider({ children }: SearchContextProvider) {
  const [search, setSearch] = useState<any>([]);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
