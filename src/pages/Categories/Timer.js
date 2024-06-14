import React, { useEffect, useState } from 'react';

const Timer = ({ initialSeconds, orderId }) => {
  const storedSeconds = localStorage.getItem(`timer_${orderId}`);
  const [seconds, setSeconds] = useState(storedSeconds ? parseInt(storedSeconds) : initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    localStorage.setItem(`timer_${orderId}`, seconds.toString());
  }, [seconds, orderId]);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

  return formattedTime;
};

export default Timer;