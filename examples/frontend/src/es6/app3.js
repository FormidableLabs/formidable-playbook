import { red } from "./util-reexport";

// app1, but using `red` from `util-reexport` instead of `util`.
document.querySelector("#content").innerHTML += red("app3", "App 3");
