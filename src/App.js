import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import useFetch from "./useFetch";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactScreen from "./screen/ContactScreen";
import SingleAttivitaScreen from "./screen/SingleAttivitaScreen";
import ErrorScreen from "./screen/ErrorScreen";
import HomeScreen from "./screen/HomeScreen";
import ToolScreen from "./screen/ToolScreen";
import AttivitaScreen from "./screen/AttivitaScreen";
import AuthScreen from "./screen/AuthScreen";
import PageScreen from "./screen/PageScreen";
import ForgotPasswordScreen from "./screen/ForgotPasswordScreen";
import ResetPasswordScreen from "./screen/ResetPasswordScreen";
import { ToolProvider } from "./toolContext";
import { useGlobalContext } from "./context";

function App() {
  const { isLoading, isError, data } = useFetch("pages");
  const { localPage, setLocalPage } = useGlobalContext();

  useEffect(() => {
    if (!isLoading && !isError) {
      setLocalPage(data);
      localStorage.setItem("pagine-wp", JSON.stringify(data));
    }
  }, [data]);

  return (
    <>
      <Loader isLoading={isLoading} isError={isError} />
      <Router className='App'>
        <Navbar />
        <Sidebar />
        <Routes>
          {!isLoading && !isError
            ? data.map((page) => {
                return (
                  <Route
                    key={page.id}
                    path={`/${page.slug}`}
                    element={<PageScreen {...page} />}
                  />
                );
              })
            : isLoading && localPage
            ? localPage.map((page) => {
                return (
                  <Route
                    key={page.id}
                    path={`/${page.slug}`}
                    element={<PageScreen {...page} />}
                  />
                );
              })
            : null}
          <Route
            path='/organizza-esperienza'
            element={
              <ToolProvider>
                <ToolScreen />
              </ToolProvider>
            }
          />
          <Route path='/' element={<HomeScreen />} />
          <Route path='/attivita' element={<AttivitaScreen />} />
          <Route path='/attivita/:slug' element={<SingleAttivitaScreen />} />
          <Route path='/contattaci' element={<ContactScreen />} />
          <Route
            path='/accedi'
            element={
              <ToolProvider>
                <AuthScreen />
              </ToolProvider>
            }
          />
          <Route
            path='/accedi/password-dimenticata'
            element={<ForgotPasswordScreen />}
          />
          <Route
            path='/accedi/reset-password/:email/:code'
            element={<ResetPasswordScreen />}
          />
          <Route path='*' element={<ErrorScreen />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
