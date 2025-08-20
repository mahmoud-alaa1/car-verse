import { useEffect, useState } from "react";
import api from "./services/backend";
import Providers from "./providers/Providers";

import { BrowserRouter, Route, Routes } from "react-router";
import LoginForTest from "./components/LoginForTest";
import MainPageForTest from "./components/MainPageForTest";

function App() {
  const x = 23;

  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPageForTest />}>
            <Route path="/login" element={<LoginForTest />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
