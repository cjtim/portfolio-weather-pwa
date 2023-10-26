import { useEffect } from "react";

import { Box, Center, Stack, Text } from "@chakra-ui/react";
import { addServiceWorker } from "./tools/service-worker";
import { useGeo } from "./hooks/useGeo";
import { requestNotification } from "./tools/notification";

const init = () => {
  addServiceWorker();
  requestNotification();
};

function App() {
  useEffect(() => init(), []);
  const [geo, weather] = useGeo();

  return (
    <Center w="100vw" h="100vh">
      <Box borderWidth="1px" borderRadius="lg" w="50%" h="50%">
        <Stack>
          <Text>{weather.city.name}</Text>
          <Text>
            {geo?.lat} {geo?.long}
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}

export default App;
