import { Flex, Img, Stack, Text } from "@chakra-ui/react";
import { List } from "../interfaces/openweathermap";
import { mapIcon } from "../tools/weatherAPI";

interface Props {
  lists: List[];
}

export const NextHours: React.FC<Props> = ({ lists }: Props) => {
  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      gap={2}
      w="xl"
      overflowX="auto"
    >
      {lists.slice(1).map((l, idx) => (
        <Stack key={`nexthour-${idx}`} alignItems={"center"}>
          <Text>{new Date(l?.dt * 1000).getHours() + ":00"}</Text>
          <Img
            src={mapIcon[l?.weather[0]?.icon]}
            alt={l?.weather[0]?.description}
            aria-label={l?.weather[0]?.description}
            w="24"
          />
          <Text
            textTransform="capitalize"
            textAlign="center"
            fontSize="smaller"
          >
            {l?.weather[0]?.description}
          </Text>
          <Text>{Math.floor(l?.main?.temp)}°F</Text>
        </Stack>
      ))}
    </Flex>
  );
};
