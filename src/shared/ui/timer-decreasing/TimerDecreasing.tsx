'use client'
import { FC, useEffect, useRef, useState } from 'react';

import styles from './TimerDecreasing.module.scss';

interface TimerDecreasingProps {
  duration: number;
  endCallback: () => void
}

const TimerDecreasing: FC<TimerDecreasingProps> = ({ duration, endCallback }) => {
  const [endTime, setEndTime] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const initDuration = 70 * duration 
  let frame = initDuration
  const animationIdRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (endTime) {
      endCallback();
    }
  }, [endTime, endCallback]);
  
  useEffect(() => { 
    if (!canvasRef.current) return; 
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d') 
    if (!context) return;
    
    const width = canvas.width 
    const height = canvas.height 
    
    const drawProgressBar = () => {
      const progress = (frame / initDuration) * width;
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#3cb371';
      context.fillRect(0, 0, progress, height); 
    };

    const animate = () => {
      frame--;
      drawProgressBar(); 
      if (frame > 0) { 
        animationIdRef.current =  requestAnimationFrame(animate);
      } else {
        setEndTime(true);
      }
    }; 

 
    requestAnimationFrame(animate);  
        
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    }    
  }, [frame, initDuration])


  return (
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
      );
};

export { TimerDecreasing };
