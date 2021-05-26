import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import App from "./App/App";
import ScrollToTop from "./ScrollToTop/ScrollToTop";

const Routes = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" render={() => <Redirect to="/new" />} exact={true} />
          <Route path="/:type" component={App} />
        </Switch>
      </Router>
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default Routes;
