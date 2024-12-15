// const { merge } = require("webpack-merge");
import { merge } from "webpack-merge";
// const common = require("./webpack.common.js");
import { default as common } from "./webpack.common.js";

export default merge(common, {
  mode: "production",
});
