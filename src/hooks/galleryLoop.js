import { useState } from "react";

const GalleryLoop = (array) => {

    const [index, setIndex] = useState(0);
    const currItem = array[index] || null;
  
    const prevImage = () => {setIndex(prevIndex => (prevIndex - 1 + array.length) % array.length)};
    const nextImage = () => {setIndex(prevIndex => (prevIndex + 1) % array.length)};
  
    return [index, setIndex, currItem, prevImage, nextImage]
  }

export default GalleryLoop;
