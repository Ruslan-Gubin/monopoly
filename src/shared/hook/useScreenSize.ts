'use client'
import { useEffect, useState } from "react"
import { debounce } from "../lib/helpers/debounce";

export const useScreenSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });


  function handleResize()  {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    const debonceResize = debounce(handleResize)
    
    window.addEventListener('resize', debonceResize);

    return () => {
      window.removeEventListener('resize', debonceResize);
    };
  }, []);

  return {
    width: windowSize.width,
    height: windowSize.height
  }
}