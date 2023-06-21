import { useEffect, useState } from 'react';
import { clearInterval, setInterval } from 'worker-timers';
import { motion as m } from 'framer-motion';
import Alert from '/notif.wav';
import AlertTwo from '/notif2.wav';

const variants = {
  initial: { opacity: 0.5 },
  animate: { opacity: 1 },
};

const audio = new Audio();
audio.src = Alert;
const audioTwo = new Audio();
audioTwo.src = AlertTwo;

export default function Counter() {
  const [rest, setRest] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [restSeconds, setRestSeconds] = useState(0);
  const [restMinutes, setRestMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    if (minutes === 30) {
      setIsRunning(false);
      setSeconds(0);
      setMinutes(0);
      audio.play();
      setIsResting(true);
      document.body.classList.remove('working');
      document.body.classList.add('resting');
    }

    let intervalId: number;
    if (isRunning) {
      intervalId = setInterval(timer, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, seconds, minutes]);

  useEffect(() => {
    const restElapsed = restMinutes * 60 + restSeconds;
    if (restElapsed >= rest) {
      setIsResting(false);
      setIsRunning(true);
      setRestSeconds(0);
      setRestMinutes(0);
      audioTwo.play();
      document.body.classList.remove('resting');
      document.body.classList.add('working');
    }
    let intervalId: number;
    if (isResting) {
      intervalId = setInterval(restTimer, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isResting, restSeconds, restMinutes]);
  const timer = () => {
    if (seconds === 59) {
      setMinutes((prevMinute) => prevMinute + 1);
      setSeconds(0);
      return;
    }

    setSeconds((prevSecond) => prevSecond + 1);
  };

  const restTimer = () => {
    if (seconds === 59) {
      setRestMinutes((prevMinute) => prevMinute + 1);
      setRestSeconds(0);
      return;
    }

    setRestSeconds((prevSecond) => prevSecond + 1);
  };

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };
  return (
    <main className="shade flex-grow flex flex-col justify-center items-center">
      <section className="flex items-center gap-2">
        <h2>Rest Time:</h2>
        <div className="flex gap-4 text-xl text-white p-2">
          <m.button
            className="bg-teal-500 px-4 rounded-full hover:scale-110 active:translate-y-4 transition-transform"
            variants={variants}
            initial="initial"
            animate={rest === 30 ? 'animate' : 'initial'}
            onClick={() => setRest(30)}
          >
            30s
          </m.button>
          <m.button
            className="bg-teal-500 px-4 rounded-full hover:scale-110 active:translate-y-4 transition-transform"
            variants={variants}
            initial="initial"
            animate={rest === 60 ? 'animate' : 'initial'}
            onClick={() => setRest(60)}
          >
            1m
          </m.button>
          <m.button
            className="bg-teal-500 px-4 rounded-full hover:scale-110 active:translate-y-4 transition-transform"
            variants={variants}
            initial="initial"
            animate={rest === 120 ? 'animate' : 'initial'}
            onClick={() => setRest(120)}
          >
            2m
          </m.button>
          <m.button
            className="bg-teal-500 px-4 rounded-full hover:scale-110 active:translate-y-4 transition-transform"
            variants={variants}
            initial="initial"
            animate={rest === 180 ? 'animate' : 'initial'}
            onClick={() => setRest(180)}
          >
            3m
          </m.button>
          <m.button
            className="bg-teal-500 px-4 rounded-full hover:scale-110 active:translate-y-4 transition-transform"
            variants={variants}
            initial="initial"
            animate={rest === 300 ? 'animate' : 'initial'}
            onClick={() => setRest(300)}
          >
            5m
          </m.button>
        </div>
      </section>
      {!isResting && (
        <m.button
          animate={
            isRunning
              ? { backgroundColor: 'rgb(239, 68, 68, 50)' }
              : { backgroundColor: 'rgb(34, 197, 94, 50)' }
          }
          initial={{ backgroundColor: 'rgb(34, 197, 94, 50)' }}
          className="p-3 rounded-full ml-4 text-2xl text-white hover:scale-110 active:translate-y-4 transition-transform"
          onClick={startAndStop}
        >
          {isRunning ? 'Stop the Count!' : 'Start'}
        </m.button>
      )}
      <section className="gap-4 p-2 ml-4 text-4xl text-center">
        {isResting && 'Time to rest!'}
        {isRunning && 'Time to work!'}
        {!isRunning && !isResting && 'Elapsed Time:'}
        {(isRunning || !isRunning) && !isResting ? (
          <p className="p-2">
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
          </p>
        ) : (
          <p className="p-2">
            {restMinutes.toString().padStart(2, '0')}:
            {restSeconds.toString().padStart(2, '0')}
          </p>
        )}
      </section>
    </main>
  );
}
