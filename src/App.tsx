import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { IndexPage } from "./components/Pages";
import { BoostsPage } from "./components/Pages/boosts";
import { useExpand } from "@vkruglikov/react-telegram-web-app";

function App() {
  const [count, setCount] = useState<number>(40432);
  const [maxPower, setMaxPower] = useState<number>(1000);
  const [click, setClick] = useState<number>(65);
  const [progress, setProgress] = useState<number>(100);
  const [currentPower, setCurrentPower] = useState<number>(0);
  const [isIncreasing, setIsIncreasing] = useState<boolean>(false);
  const [isExpanded, expand] = useExpand();
  useEffect(() => {
    expand();
  }, []);

  useEffect(() => {
    setProgress((currentPower / maxPower) * 100);
    if (currentPower > 0 && currentPower < maxPower && !isIncreasing) {
      setIsIncreasing(true);

      const increaser = setInterval(() => {
        setCurrentPower((prevPower) => {
          const newPower = prevPower - 1;
          if (newPower === 0) {
            clearInterval(increaser);
            setIsIncreasing(false);
          }

          return newPower;
        });
      }, 1000);
    }
  }, [currentPower, maxPower, isIncreasing]);

  return (
    <Routes>
      <Route
        index
        element={
          <IndexPage
            click={click}
            count={count}
            currentPower={currentPower}
            setCount={setCount}
            setCurrentPower={setCurrentPower}
            progress={progress}
            maxPower={maxPower}
          />
        }
      />
      <Route path={"boosts"} element={<BoostsPage count={count} />} />
    </Routes>
  );
}

export default App;
