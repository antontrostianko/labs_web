import React, { useState, useEffect } from "react";
import Block from "./Block";
import "./App.css"; // Импортируем файл стилей

const App = () => {
  const [blocks, setBlocks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBlocks, setShowBlocks] = useState(false);

  useEffect(() => {
    let interval;
    if (showBlocks && currentIndex < 6) {
      interval = setInterval(() => {
        generateBlock();
      }, 3000);
    } else if (currentIndex === 6) {
      setTimeout(() => {
        setBlocks([]);
        setCurrentIndex(0);
        setShowBlocks(false);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [showBlocks, currentIndex]);

  const generateBlock = () => {
    const text = [
      "Slipknot",
      "Darkthrone",
      "Pantera",
      "Cannibal Corpse",
      "Meshuggah",
      "Architects",
    ];
    const images = [
      "https://i.pinimg.com/736x/d2/d6/85/d2d6851a7ce3818110e391c500c0b4b8.jpg",
      "https://www.metal-tracker.com/torrents/images/3386230.jpg",
      "https://sun9-4.userapi.com/impg/5nXEIhFMGQEacTp4Vyl4fKOor00i2VH324RrTA/JhsDb6LQxug.jpg?size=1000x1000&quality=96&sign=0a9c5fa2611f4a86b565601245131d59&c_uniq_tag=RkoXfCex8OYznUfoO0Iy8bj_fieSQQSgFj0PmH210uo&type=album",
      "https://i1.sndcdn.com/artworks-000095289190-u97r92-t500x500.jpg",
      "https://www.eventworld.co/blob/images/pg/meshuggah_8433a_1000.jpg",
      "https://avatars.yandex.net/get-music-content/118603/581e443a.p.701626/m1000x1000?webp=false",
    ];

    const newBlock = {
      id: currentIndex + 1,
      image: images[currentIndex],
      text: `${currentIndex + 1}: ${text[currentIndex]}`,
    };

    if (currentIndex !== 0) {
      // Если это не первый блок, добавляем новый блок к существующему массиву блоков
      setBlocks((prevBlocks) => {
        const newBlocks = [...prevBlocks, newBlock];
        // Убираем предыдущий блок из массива
        return newBlocks.slice(1);
      });
    } else {
      // Если это первый блок, заменяем массив блоков только на новый блок
      setBlocks([newBlock]);
    }

    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleShowBlocks = () => {
    setShowBlocks(true);
  };

  return (
    <div className="app-container">
      <button
        onClick={handleShowBlocks}
        disabled={showBlocks}
        className="show-button"
      >
        Показать участников группы
      </button>
      <div className="blocks-container">
        {blocks.map((block) => (
          <div key={block.id} className="block-item">
            <Block {...block} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
