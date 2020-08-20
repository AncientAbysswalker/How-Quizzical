import styled from "styled-components";

const col_grey = "#494949";
const col_green = "#0CC76D";
const col_red = "#ff6961";
const col_ltgrey = "#f2f2f2";

export const Wrapper = styled.div`
  width: 50vw;
  max-width: 1100px;
  background: ${col_ltgrey};
  border: 4px solid ${col_grey};
  padding: 40px;
  margin: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
  p {
    font-size: 1rem;
    text-align: left;
    margin-top: 0;
  }
`;

type ButtonWrapperProps = {
  correct: boolean;
  userClicked: boolean;
  userHasAnswered: boolean;
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  button {
    cursor: ${({ userHasAnswered }) =>
      userHasAnswered ? "default" : "pointer"};
    user-select: none;
    font-size: 0.8rem;
    width: 100%;
    height: 40px;
    margin: 5px 0;
    color: #494949 !important;
    background: #ffffff;
    padding: 10px 20px 10px 20px;
    border: 4px solid !important;
    border-color: ${({ correct, userClicked, userHasAnswered }) =>
      !userHasAnswered
        ? col_grey
        : correct
        ? col_green
        : !correct && userClicked
        ? col_red
        : col_grey} !important;

    background: ${({ correct, userClicked }) =>
      correct ? col_green : !correct && userClicked ? col_red : "#ffffff"};
    border: 3px solid #ffffff;
    color: #fff;
    transition: all 0.4s ease 0s;
  }
  button:hover {
    ${({ userHasAnswered }) =>
      !userHasAnswered
        ? `color: #ffffff !important;
          background: ${col_grey};
          transition: all 0.4s ease 0s;`
        : ""};
  }
  button:focus {
    outline: none;
  }
`;
