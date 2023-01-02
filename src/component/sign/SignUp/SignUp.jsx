import React from "react";
import "../../../css/sign_t/SignUp.css";

import { Controller, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

import { SignUpDetailPostAxios } from "../../common/api.js";
import { signUpSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrMsg from "../../common/FormErrMsg";

function SignUp({ history }) {
  const onSubmitSignUp = (data) => {
    const dateSplit = data.birth.split("-");

    SignUpDetailPostAxios({
      ...data,
      vy: dateSplit[0],
      mm: dateSplit[1],
      dd: dateSplit[2],
    }).then((res) => {
      if (res.data.result !== 0) alert(res.data.message);
      else {
        alert(
          " 유효성 검증 적용을 위한 데모 페이지이며 실제 가입은 되지 않습니다."
        );
        history.push("/");
      }
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  return (
    <div className="signUpWrapper">
      <div className="title">
        <NavLink to="/">회원가입 (홈으로)</NavLink>
      </div>
      <form className="formWrapper" onSubmit={handleSubmit(onSubmitSignUp)}>
        <div className="inputGroup">
          <div className="inputWrapper">
            <div className="inputTitle">아이디</div>
            <div className="inputBox">
              <Controller
                name="userId"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} />}
              />
            </div>
            <FormErrMsg isError={errors.userId} />
          </div>
          <div className="inputWrapper">
            <div className="inputTitle">비밀번호</div>
            <div className="inputBox">
              <Controller
                name="userPassword"
                control={control}
                defaultValue=""
                render={({ field }) => <input type="password" {...field} />}
              />
            </div>
            <FormErrMsg isError={errors.userPassword} />
          </div>
          <div className="inputWrapper">
            <div className="inputTitle">비밀번호 확인</div>
            <div className="inputBox">
              <Controller
                name="passwordConfirm"
                control={control}
                defaultValue=""
                render={({ field }) => <input type="password" {...field} />}
              />
            </div>
            <FormErrMsg isError={errors.passwordConfirm} />
          </div>
          <div className="inputWrapper">
            <div className="inputTitle">이름</div>
            <div className="inputBox">
              <Controller
                name="userName"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} />}
              />
            </div>
            <FormErrMsg isError={errors.userName} />
          </div>
          <div className="inputWrapper">
            <div className="inputTitle">생년월일</div>
            <div className="inputBox">
              <Controller
                name="birth"
                control={control}
                defaultValue=""
                render={({ field }) => <input type="date" {...field} />}
              />
            </div>
            <FormErrMsg isError={errors.birth} />
          </div>
          <div className="inputWrapper">
            <div className="inputTitle">성별</div>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field}>
                  <option value="">성별</option>
                  <option value="M">남자</option>
                  <option value="F">여자</option>
                </select>
              )}
            />
            <FormErrMsg isError={errors.gender} />
          </div>
          <div className="inputWrapper">
            <div className="inputTitle">
              본인 확인 이메일
              <span className="choiceText">(선택)</span>
            </div>
            <div className="inputBox">
              <Controller
                name="userEmail"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input placeholder="선택입력" {...field} />
                )}
              />
            </div>
            <FormErrMsg isError={errors.userEmail} />
          </div>
          <div className="inputWrapper">
            <div className="inputTitle">휴대전화</div>
            <div className="inputBox">
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input placeholder="- 없이 입력해주세요" {...field} />
                )}
              />
            </div>
            <FormErrMsg isError={errors.phone} />
          </div>
          <button type="submit" className="signUpBtn">
            가입하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
