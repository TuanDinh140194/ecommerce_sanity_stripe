import Layouts from "@/components/Layouts";
import { StateContext } from "@/context/StateContext";
import React from "react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Layouts>
        <Toaster/>
        <Component {...pageProps} />
      </Layouts>
    </StateContext>
  );
}
