import React from "react";
import "../../../css/Common/FormErrMsg.css";

export default function FormErrMsg({ isError }) {
  return isError ? <p className="formErrMsg">{isError.message}</p> : null;
}
