import { useContext } from "react";

import {CompanyContext} from '../context/CompanyContext'

const useCompanyContext = () => useContext(CompanyContext)

export  {useCompanyContext}