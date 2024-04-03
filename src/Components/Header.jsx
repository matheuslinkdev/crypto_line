import { Flex, Heading, Select, useTheme } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ navigation }) => {
  const navigate = useNavigate();

  const theme = useTheme();

  return (
    <header
      style={{
        backgroundColor: theme.colors.commons[975],
        height: "10dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Flex
        width="100%"
        alignItems="center"
        gap="2"
        justifyContent="space-between"
        margin="0 20px"
      >
        <Link to="/">
          <Heading
            size="lg"
            color={theme.colors.yellow[600]}
            fontFamily="Raleway"
            fontWeight={300}
          >
            CryptoLine
          </Heading>
        </Link>
        <Select
          defaultValue={"USD"}
          width="100px"
          height="40px"
          marginLeft="15px"
          variant="filled"
          bg={theme.colors.commons[950]}
          color="white"
          _hover={{
            bg: theme.colors.commons[800],
            cursor: "pointer",
          }}
          css={{
            option: {
              backgroundColor: theme.colors.commons[950],
              color: "white",
              fontSize: "18px",
            },
          }}
        >
          <option value={"USD"}>USD</option>
          <option value={"BRL"}>BRL</option>
          <option value={"EUR"}>EUR</option>
        </Select>
      </Flex>
    </header>
  );
};

export default Header;
