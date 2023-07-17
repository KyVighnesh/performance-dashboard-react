import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([{
    path:"/",
    element:<Signin/>
},
{
    path:"/Signup",
    element:<Signup/>

},

{
    path:"/Dashboard",
    element:<Dashboard/>
}])

export default router