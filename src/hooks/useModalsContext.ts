import { useContext } from "react";

import {ModalsContext} from '../context/ModalsContext'

const useModalsContext = () => useContext(ModalsContext)

export default useModalsContext