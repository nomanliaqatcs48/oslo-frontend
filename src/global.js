import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
    transition: all 0.25s linear;
  }

  .sidebar {
    background-color: ${({ theme }) => theme.sidebarBg};
  }

  .oslo-card {
    padding: 16px 24px 40px 24px;
    gap: 10px;
    border-radius: 16px;
    background: ${({ theme }) => theme.cardBg} !important;
    min-height: 50vh;
  }

  .table-header td {
    background-color: ${({ theme }) => theme.cardBg} !important;
    color: ${({ theme }) => theme.text} !important;
  }

  .stats-section {
    display: flex;
    padding: 22.462px 17.628px 22.462px 16.718px;
    justify-content: space-between;
    align-items: center;
    border-radius: 16px;
    border: 1px solid #948f8f;
  }

  .oslo-form select {
    background-color: ${({ theme }) => theme.cardBg} !important;
    border: 1px solid #948F8F !important;
    color: ${({ theme }) => theme.text} !important;
  }

  select:invalid {
    color: ${({ theme }) => theme.placeholderColor} !important;
  }

  input::placeholder {
    color: ${({ theme }) => theme.placeholderColor} !important;
  }

  .oslo-form input {
    background-color: ${({ theme }) => theme.cardBg} !important;
    border: 1px solid #948F8F !important;
    color: ${({ theme }) => theme.text} !important;
  }

  .oslo-form .form-check-input:checked {
    background-color: #2C2C2C !important;
    border: 1px solid #948F8F !important;
    color: ${({ theme }) => theme.text} !important;
  }

  .description {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
  }
  
  .description a {
    color: #0d6efd;
  }

  .active {
    border-radius: 8px;
    background:  ${({ theme }) => theme.activeContentBg};
  }

  .sidebar-content {
    display: flex;
    padding: 8px 23.5px 8px 24.5px;
  }
  .sidebar-content:hover {
    border-radius: 8px;
    background: ${({ theme }) => theme.activeContentBg};
  }

  .secure {
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: ${({ theme }) => theme.activeContentBg};
  }

  .active-step {
    background: ${({ theme }) => theme.primaryBtn};
    color: #FFF;
  }
  
  .inactive-step {
    background: #CFB57740;
    color: ${({ theme }) => theme.text};
  }

  .complete-step {
    background: #00cc39;
    color: #FFF;
  }

  .wallet-section {
    border-radius: 16px;
    background: ${({ theme }) => theme.cardBg};
    backdrop-filter: blur(2px);
    width: 100%;
    height: auto;
    margin-top: 1rem;
  }

  .seed-section {
    padding: 24px;
    gap: 24px;
    border: 1px solid #bbb4a4;
    border-radius: 16px;
    margin-top: 2rem;
  }

  .forgot_link {
    color: #0d6efd;
    text-decoration: underline;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
  }

  .spinner-loading {
    position: absolute; 
    top: 50%;
    left: 55%;
  }

  .spinner-loading-list {
    position: absolute; 
    top: 68%;
    left: 57%;
  }

  .modal-width {
    max-width: 670px;
  }
  `;
