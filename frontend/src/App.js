import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { Buyer, Seller } from "./Authentication/auth";
import PropertyForm from "./Pages/PropertyForm";
import SellerProperty from "./Pages/SellerProperty";
import UpdateForm from "./Pages/UpdateForm";
import PropertyItem from "./Pages/PropertyItem";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                {" "}
                <Home />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                {" "}
                <Register />
              </Layout>
            }
          />

          <Route
            path="/login"
            element={
              <Layout>
                {" "}
                <Login />
              </Layout>
            }
          />
          <Route
            path="/add-property"
            element={
              <Layout>
                {" "}
                <Seller>
                  <PropertyForm />
                </Seller>
              </Layout>
            }
          />
          <Route
            path="/own-property"
            element={
              <Layout>
                {" "}
                <Seller>
                  <SellerProperty />
                </Seller>
              </Layout>
            }
          />
          <Route
            path="/update-property/:id"
            element={
              <Layout>
                {" "}
                <Seller>
                  <UpdateForm/>
                </Seller>
              </Layout>
            }
          />
          <Route
            path="/items"
            element={
              <Layout>
                {" "}
                <Buyer>
                  <PropertyItem/>
                </Buyer>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
