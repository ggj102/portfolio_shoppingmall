import React from "react";
import { NavLink } from "react-router-dom";
import "../../../css/SignIn.css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { connect } from "react-redux";
import {
  gMemberId,
  gMemberName,
  gLoginState,
} from "../../../store/modules/GlobalData.js";
import { LoginPostAxios } from "../../common/api.js";
import { signinSchema } from "./schema";
import FormErrMsg from "../../common/FormErrMsg";

function SignIn({ history, gMemberId, gMemberName, loginState }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signinSchema) });

  const onSubmitLogin = (data) => {
    const { userId, userPassword } = data;

    LoginPostAxios(userId, userPassword).then((res) => {
      if (res.data.result === 0) {
        loginState(true);
        gMemberId(res.data.user_data.id);
        gMemberName(res.data.user_data.name);
        history.push("/");
      } else if (res.data.result === 100) {
        history.push("/");
      } else if (res.data.result === 101) {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      }
    });
  };

  return (
    <div className="loginWrapper">
      <div className="title">
        <NavLink to="/">로그인페이지(홈으로)</NavLink>
      </div>
      <form className="container" onSubmit={handleSubmit(onSubmitLogin)}>
        <div className="inputGroup">
          <div className="inputWrapper">
            <div className="inputBox">
              <Controller
                name="userId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    className="idInput"
                    placeholder="아이디 = test"
                    {...field}
                  />
                )}
              />
            </div>
            <FormErrMsg isError={errors.userId} />
          </div>
          <div className="inputWrapper">
            <div className="inputBox">
              <Controller
                name="userPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="password"
                    className="passwordInput"
                    placeholder="비밀번호 = test"
                    {...field}
                  />
                )}
              />
            </div>
            <FormErrMsg isError={errors.userPassword} />
          </div>
        </div>
        <button type="submit" className="loginBtn">
          로그인
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  gMemberId: (id) => dispatch(gMemberId(id)),
  gMemberName: (name) => dispatch(gMemberName(name)),
  loginState: (state) => dispatch(gLoginState(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
