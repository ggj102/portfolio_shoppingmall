import * as yup from "yup";

export const signinSchema = yup.object().shape({
  userId: yup.string().required("아이디를 입력해 주세요."),
  userPassword: yup.string().required("비밀번호를 입력해 주세요."),
});
