import React, { useState } from "react";
import { FiLayers, FiStar, FiPlusCircle, FiShoppingCart, FiTag, FiChevronsRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { NavLink, Routes, Route , Link} from 'react-router-dom';
import MainContent from "./MainContent";
import FrameCustomizer from "./FrameCustomizer";
import CaursalFrame from "./CaursalFrame";
import GodSelector from "./GodSelector";


const FrameSection = () => {
   const [showCarousel, setShowCarousel] = useState(false); 
  return (
    <div className="flex h-screen bg-indigo-50">
      
      <ExampleContent />
    </div>
  );
};

const Sidebar = ({ showCarousel, setShowCarousel }) => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-slate-300 bg-white p-2"
      style={{
        width: open ? "200px" : "fit-content",
      }}
    >
      <TitleSection open={open} />
      <div className="space-y-1">
        <Option
          Icon={FiLayers}
          title="Dimensions"
          selected={selected}
          setSelected={setSelected}
          open={open}
          to="/rq/dimensions"
        />
        <Option
  Icon={FiStar}
  title={open ? "Frames" : ""} // Hide title when closed
  selected={showCarousel}
  setSelected={() => setShowCarousel(!showCarousel)}
  open={open}
  to="/rq/dimensions/caursal"
/>
        <Option
          Icon={FiPlusCircle}
          title="Finish"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
          <Option
  Icon={FiStar}
  title={open ? "Gods" : ""} // Hide title when closed
  selected={showCarousel}
  setSelected={() => setShowCarousel(!showCarousel)}
  open={open}
  to="/rq/dimensions/"
/>
        <Option
          Icon={FiTag}
          title="Accessories"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div>
      <ToggleClose open={open} setOpen={setOpen} />

      {/* Conditional Rendering: Horizontal Scroll Carousel */}
      {showCarousel && (
        <div className="w-full mt-4">
        
          <HorizontalScrollCarousel />
          <GodSelector/>
        </div>
      )}
    </motion.nav>
  );
};


export const Option = ({ Icon, title, selected, setSelected, open, to }) => {
  return (
    <NavLink
      to={to}
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title ? "bg-white text-indigo-800" : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      <motion.button
        layout
        className="flex h-full w-full items-center"
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            {title}
          </motion.span>
        )}
      </motion.button>
    </NavLink>
  );
};

const ExampleContent = () => (
  <div className="h-[200vh] w-full">
    <Routes>
      <Route path="/" element={<MainContent />} /> {/* Default route */}
      <Route path="/dimensions" element={<FrameCustomizer />}>
        <Route path="/dimensions/" element={<CaursalFrame />} /> {/* Nested route */}
        <Route path="/dimensions/" element={<GodSelector />} /> {/* Nested route */}
      </Route>
    </Routes>
  </div>
);

const TitleSection = ({ open }) => {
  return (
    <div className="border-slate-300">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-white">
        <div className="flex items-center gap-2">
          {/* Add any title or logo here */}
        </div>
      </div>
    </div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute mt-2 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default FrameSection;