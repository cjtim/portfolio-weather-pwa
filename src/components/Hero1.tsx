import { Flex, Img, Skeleton, Stack, Text } from "@chakra-ui/react";
import { mapIcon } from "../tools/weatherAPI";

interface Props {
  icon?: string;
  city?: string;
  temp?: number;
  description?: string;
  low?: number;
  max?: number;
  loading: boolean;
}

export const Hero1: React.FC<Props> = ({
  icon,
  city,
  temp,
  description,
  low,
  max,
  loading,
}: Props) => {
  return (
    <Stack alignItems="center">
      {loading ? (
        <>
          <Skeleton h="8" w="48" />
          <Skeleton h="8" w="24" />
          <Skeleton h="8" w="48" />
        </>
      ) : (
        <Flex alignItems="center">
          <Img
            src={mapIcon[icon || ""]}
            alt={description}
            aria-label={description}
            w="48"
          />
          <Stack>
            <Text fontSize="2xl">{city}</Text>
            <Flex alignItems="flex-start">
              <Text fontSize="2xl">{Math.floor(temp || 0)}</Text>
              <Text fontSize="2xl">°F</Text>
            </Flex>

            <Text textTransform="capitalize" fontSize="2xl">
              {description}
            </Text>
            <Text>{`Hi:${max} Low:${low}`}</Text>
          </Stack>
        </Flex>
      )}
    </Stack>
  );
};
