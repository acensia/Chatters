# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Polyjuice Chatter

Basic idea is from [Polyjuice - discord bot](https://github.com/acensia/Polyjuice_dis).

# Update Log

- 2024.02.24
  Polyjuice Chatter-beta launched

- 2024.02.28
  The functions of Polyjuice-discord completely implemented.

- 2024.02.29
  Fix the case that server doesn't respond but application is activated.

- 2024.03.31
  Scrolling added as a message attached

- 2024.04.02
  Add session management for the server, to enable multiple communications for each client.
  Change data type from text to json, to add one more information:session_id.
  Modify data flow to let last circle (name selector) also able to get session_id.
