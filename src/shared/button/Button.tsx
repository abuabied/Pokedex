import { SEARCH_BUTTON, SHOW_ALL_BUTTON } from "../../constants/ButtonClasses";
import { LOAD, SEARCH, SHOW_ALL } from "./ButtonTextValues";
import "./Button.css";

export const Button = (props: { button_class: string; onClick:any}) => {
  let button_text;
  switch (props.button_class) {
    case SEARCH_BUTTON:
      button_text = SEARCH;
      break;
    case SHOW_ALL_BUTTON:
      button_text = SHOW_ALL;
      break;

    default:
      button_text = LOAD;
      break;
  }
  return (
    <button className={props.button_class} onClick={props.onClick}>
      {button_text}
    </button>
  );
};
