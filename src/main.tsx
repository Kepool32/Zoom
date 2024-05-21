import React from 'react'
import ReactDOM from 'react-dom/client'

import App from "./component/App/App";

console.log("----------", document.getElementById('SlmRootContainer'))

ReactDOM.createRoot(document.getElementById('SlmRootContainer')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
