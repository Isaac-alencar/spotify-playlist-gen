import { useAuth } from "@/providers/AuthenticationProvider";
import {
  Avatar,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";

export const Header = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container py={10}>
        <Flex alignItems="center" gap={4} width="100%">
          <SkeletonCircle size="10" />
          <Skeleton noOfLines={2} height="20px">
            Username placeholder
          </Skeleton>
        </Flex>
      </Container>
    );
  }

  return (
    <Container py={10}>
      <Flex alignItems="center" gap={4} width="100%">
        <Avatar name={user.display_name} src={user.images.url} />
        <Text fontSize="lg" color="green.400" fontWeight="semibold">
          {user.display_name}
        </Text>
      </Flex>
    </Container>
  );
};
