import { Selector } from "react-redux";
import { tokenStateType } from "../store";

export const tokenSelector: Selector <tokenStateType, string> = (state) => state.token.value;