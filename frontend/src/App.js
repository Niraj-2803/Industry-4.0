import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import ToolsCarousel from "./components/ToolRoom";
import Footer from "./components/footer";
import WhyChooseUs from "./components/Whyus";
import ReadinessForm from "./components/ReadinessForm";
import ReadinessScore from "./components/ReadinessScore";
import DisplayScore from "./components/DisplayScore";
import Phase1Page from "./components/Phases/Phase1";
import Phase2Page from "./components/Phases/Phase2";
import Phase3Page from "./components/Phases/Phase3";
import Phase4Page from "./components/Phases/Phase4";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={
          <>
            <Navbar/>
            <Home/>
            <AboutUs/>
            <WhyChooseUs/>
            <ReadinessForm/>
            <ToolsCarousel/>
            <Footer/>
          </>
          }
          />
          <Route path='/readiness-score' element={
          <>
            <ReadinessScore/>
          </>
          }
          />
          <Route path="/timeline" element={
            <>
              <DisplayScore/>
            </>
          }
          />
          <Route path="/phase1" element={
            <>
              <Phase1Page/>
            </>
          }
          />
          <Route path="/phase2" element={
            <>
              <Phase2Page/>
            </>
          }
          />
          <Route path="/phase3" element={
            <>
              <Phase3Page/>
            </>
          }
          />
          <Route path="/phase4" element={
            <>
              <Phase4Page/>
            </>
          }
          />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
