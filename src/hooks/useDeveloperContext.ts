import { useContext } from "react";

import {DeveloperContext} from '../context/DeveloperContext'

const useDeveloperContext = () => useContext(DeveloperContext)

export  {useDeveloperContext}