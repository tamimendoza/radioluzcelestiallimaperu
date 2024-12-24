import type Imagen from "@src/interfaces/Imagen";
import { useEffect, useState } from "react";

export default function SliderComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagenes, setImagenes] = useState<Imagen[]>([]);

  useEffect(() => {
    loadImagenes();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlider();
    }, 5000);

    return () => clearInterval(timer);
  }, [imagenes])

  const nextSlider = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imagenes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlider = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1,
    );
  };

  const loadImagenes = async () => {
    const response = await fetch("api/imagen.obtener.json")
    const data = await response.json()
    if (data) setImagenes(data)
  }

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
      <div
        className="absolute w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imagenes.map((image, index: number) => (
          <div
            key={index}
            className="absolute w-full h-full"
            style={{ left: `${index * 100}%` }}
          >
            <img
              src={image.src}
              alt={"Slide ${index + 1}"}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlider}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
      />

      <button
        onClick={nextSlider}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
      />

      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {imagenes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white w-4" : "bg-white/50"}`}
          >
            <span className="sr-only">Slice {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
