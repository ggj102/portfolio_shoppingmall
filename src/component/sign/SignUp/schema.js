import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  userId: yup
    .string()
    .required("아이디를 입력해 주세요.")
    .min(4, "최소 4자 이상 입력해 주세요.")
    .max(20, "최대 20자까지 입력할 수 있습니다.")
    .matches(
      /^[a-zA-Z0-9-_]*$/,
      "영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."
    ),
  userPassword: yup
    .string()
    .required("비밀번호를 입력해 주세요.")
    .min(4, "최소 4자 이상 입력해 주세요.")
    .max(16, "최대 16자까지 입력할 수 있습니다.")
    .matches(
      /(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
      "영문 대/소문자, 숫자, 특수문자를 모두 포함해 주세요."
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("userPassword"), null], "비밀번호가 같지 않습니다."),

  userName: yup.string().required("이름을 입력해 주세요."),
  birth: yup
    .string()
    .required("생년월일을 입력해 주세요.")
    .test("날짜 초과", "현재 날짜를 초과할 수 없습니다.", (val) => {
      const today = new Date();
      const year = today.getFullYear();
      const month = ("0" + (today.getMonth() + 1)).slice(-2);
      const day = ("0" + today.getDate()).slice(-2);
      const split = val.split("-");

      const compareData = new Date(year, month, day);
      const currnetData = new Date(split[0], split[1], split[2]);

      return currnetData <= compareData;
    }),
  gender: yup
    .string()
    .test("genderCheck", "성별을 선택해 주세요.", (val) => val),
  userEmail: yup.string().email("양식이 맞지 않습니다."),
  phone: yup
    .string()
    .required("휴대전화 번호를 입력해 주세요.")
    .matches(/^01(?:0|1|[6-9])(?:\d{7}|\d{8})$/, "양식이 맞지 않습니다."),
});
