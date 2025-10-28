import Navbar from "./component/Navbar"
import Centre from "./component/Main"
import Footer from "./component/Footer"
import { Toaster } from "react-hot-toast";
export default function App() {
  return (
    <div>
        <Navbar> </Navbar>
        
        <Centre> </Centre>
         <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
        <Footer></Footer>
    </div>
  )
}
