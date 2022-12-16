import React from "react";
import "../../../css/Common.css";

export default function FormErrMsg({ isError }) {
  return isError ? <p className="formErrMsg">{isError.message}</p> : null;
}
