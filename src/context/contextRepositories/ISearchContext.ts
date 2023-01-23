import {ReactNode} from "react"

export interface SearchContextProvider {
    children: ReactNode;
}
export interface ISearchContext {
    search: any;
    setSearch?: any;
} 
