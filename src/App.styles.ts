import styled, { createGlobalStyle } from "styled-components";
import background from "./img/background.jpg";

const col_grey = "#494949";
const col_blue = "#1e90ff";

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }

    body {
        background-image: url(${background});
        background-size: cover;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content:center;
    }

    * {
        box-sizing: border-box;
        font-family: 'Ubuntu', sans-serif;
    }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    color: ${col_grey};
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    font-family: Fascinate Inline, sans-serif;
    color: ${col_grey};
    font-size: 70px;
    font-weight: 400;
    margin: 20px;
    transition: all 0.4s ease 0s;
  }

  h1:hover {
    color: ${col_blue};
    transition: all 0.4s ease 0s;
  }

  .start,
  .next {
    cursor: pointer;
    color: ${col_grey} !important;
    text-transform: uppercase;
    text-decoration: none;
    background: #ffffff;
    padding: 10px 40px 10px 40px;
    border: 4px solid ${col_grey} !important;
    display: inline-block;
    transition: all 0.4s ease 0s;
    margin: 20px 0;
  }
  .start:hover,
  .next:hover {
    color: #ffffff !important;
    background: ${col_grey};
    transition: all 0.4s ease 0s;
  }
  .start:focus,
  .next:focus {
    outline: none;
  }
  .start:active,
  .next:active {
    color: #ffffff !important;
    background: ${col_blue};
    border-color: ${col_blue} !important;
  }
  .start {
    max-width: 200px;
  }

  .dropdown {
    cursor: pointer;
    color: ${col_grey} !important;
    text-transform: uppercase;
    text-decoration: none;
    background: #ffffff;
    padding: 10px;
    margin: 20px;
    border: 4px solid ${col_grey} !important;
    display: inline-block;
    transition: all 0.4s ease 0s;
  }
  .dropdown:hover:not(:focus) {
    color: #ffffff !important;
    background: ${col_grey};
    transition: all 0.4s ease 0s;
  }
  .dropdown:focus {
    outline: none;
  }

  .loader {
    border: 8px solid ${col_grey};
    border-radius: 50%;
    border-top: 8px solid ${col_blue};
    width: 80px;
    height: 80px;
    margin: 15%;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
