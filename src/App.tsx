import { useEffect } from "react";

import { Center, Stack } from "@chakra-ui/react";
import { addServiceWorker } from "./tools/service-worker";
import { useGeo } from "./hooks/useGeo";
import { requestNotification } from "./tools/notification";
import { Hero1 } from "./components/Hero1";
import { NextHours } from "./components/NextHours";

const init = () => {
  addServiceWorker();
  requestNotification();
};

function App() {
  useEffect(() => init(), []);
  const [, weather] = useGeo();

  return (
    <Center w="100vw" h="100vh">
      <Stack>
        <Hero1
          icon={weather?.list[0]?.weather[0]?.icon}
          city={weather?.city?.name}
          temp={weather?.list[0]?.main?.temp}
          description={weather?.list[0]?.weather[0]?.description}
          low={weather?.list[0]?.main?.temp_min}
          max={weather?.list[0]?.main?.temp_max}
          loading={!weather}
        />
        <NextHours lists={weather?.list || []} />
      </Stack>
    </Center>
  );
}

export default App;
