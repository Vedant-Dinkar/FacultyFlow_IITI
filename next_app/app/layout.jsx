import "../styles/global.css";

import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";
import {NextUIProvider} from "@nextui-org/react";
export const metadata = {
  title: "Faculty Flow",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Navbar />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;