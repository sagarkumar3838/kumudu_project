import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState } from "react";

const CaursalFrame = () => {
  const [selectedCard, setSelectedCard] = useState(null); // State for selected card

  return (
    <div className="min-w-full">
      {/* Display selected card image */}
      {selectedCard && (
        <img
          src={selectedCard.url}
          alt={selectedCard.title}
          className="absolute inset-0  object-cover"
        />
      )}
      <HorizontalScrollCarousel setSelectedCard={setSelectedCard} />
    </div>
  );
};

export const HorizontalScrollCarousel = ({ setSelectedCard }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "95%"]);

  return (
    <section ref={targetRef} className="relative h-[50vh] min-w-full mx-auto bg-blue-100"> 
    
    <div className="sticky top-0 flex h-[50vh] items-center overflow-hidden">
      <motion.div style={{ x }} className="flex gap-4 min-w-full">
        {cards.map((card) => (
          <Card card={card} key={card.id} setSelectedCard={setSelectedCard} />
        ))}
      </motion.div>
    </div>
  </section>
  
  );
};

const Card = ({ card, setSelectedCard }) => {
  return (
    <div
      className="group relative h-[300px] w-[350px] overflow-x-hidden bg-neutral-200 cursor-pointer" // Added cursor-pointer
      onClick={() => setSelectedCard(card)} // Set selected card on click
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "100% 100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
          
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-90 "
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        {/* Optional title display */}
        {/* <p className="bg-gradient-to-br from-white/20 to-white/0 p-4 text-4xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p> */}
      </div>
    </div>
  );
};

export const cards = [
  { url: "/images/frame1.png", title: "Title 1", id: 1 },
  { url: "/images/frame2.png", title: "Title 2", id: 2 },
  { url: "/images/frame3.png", title: "Title 3", id: 3 },
  { url: "/images/frame4.png", title: "Title 4", id: 4 },
  // Add more cards as needed
];

export default CaursalFrame;