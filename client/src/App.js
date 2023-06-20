import { useState } from "react";
import "./App.css";
import CustomerForm from "./Components/CustomerForm";
import CustomerList from "./Components/CustomerList";

function App() {
  const [open, setOpen] = useState(false)
  return <div>
    <CustomerList open={open} setOpen={setOpen} />
    {/* <CustomerForm /> */}
    </div>;
}

export default App;
