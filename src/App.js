import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import RegDonor from "./components/RegDonor";
import NavBar from "./components/NavBar";
import RegReceier from "./components/RegReceier";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminProfile from "./components/AdminProfile";
import AllProduct from "./components/AllProducts";
import DonorLogin from "./components/DonorLogin";
import ReceiverLogin from "./components/ReceiverLogin";
import DonorProfile from "./components/DonorProfile";
import ReceiverProfile from "./components/ReceiverProfile";
import TopSlider from "./components/TopSlider";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <NavBar />
        <div className="container-fluid p-2">
          <TopSlider />
        </div>
        <Switch>
          <Route component={AllProduct} path="/" exact />
          <Route component={RegDonor} path="/Regdonor" />
          <Route component={RegReceier} path="/register" />
          <Route component={AdminLogin} path="/alogin" />
          <Route component={DonorLogin} path="/slogin" />
          <Route component={ReceiverLogin} path="/clogin" />
          <Route component={AdminProfile} path="/aprofile" />
          <Route component={DonorProfile} path="/sprofile" />
          <Route component={ReceiverProfile} path="/cprofile" />
          <Route component={Footer} path="/footer" />
        </Switch>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
