import { useContext } from "react";

import {JobContext} from '../context/JobContext'

const useJobContext = () => useContext(JobContext)

export  {useJobContext}