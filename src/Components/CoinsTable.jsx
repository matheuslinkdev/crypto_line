import { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  Text,
  Input,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  useTheme,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import LinearLoader from "./Loader/LinearLoader";
import { useNavigate } from "react-router-dom";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const theme = useTheme();

  const { currency } = CryptoState();
  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const response = await axios.get(CoinList(currency));
      if (response.status === 200) {
        setCoins(response.data);
      } else {
        console.error("Erro ao buscar dados da API:", response.status);
      }
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCoins();
    };

    fetchData();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const navigateToCoinDetail = (coinId) => {
    navigate(`/coins/${coinId}`);
  };

  console.log(coins);

  return (
    <>
      <Flex width="90dvw" margin="auto" justifyContent="space-between">
        <Text fontSize="2xl" m={18} fontFamily="Raleway">
          CryptoCurrency Prices by Marketcap
        </Text>
        <Flex display="flex" alignItems="center">
          <FaSearch />
          <Input
            width="200px"
            margin={5}
            placeholder="Search for a Crypto"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Flex>
      </Flex>

      <Flex margin="auto" width="90dvw">
        <TableContainer>
          {loading ? (
            <LinearLoader />
          ) : (
            <Table
              width="100%"
              m="auto"
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
            >
              <Thead bgColor="#d19804">
                <Tr
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  w="90dvw"
                >
                  {["Coin", "Price", "24h Change", "Market Cap"].map(
                    (head, index) => (
                      <Th
                        key={index}
                        style={{
                          color: "#000",
                          fontWeight: "700",
                          fontFamily: "Raleway",
                          borderBottom: "1px solid #000",
                        }}
                      >
                        {head}
                      </Th>
                    )
                  )}
                </Tr>
              </Thead>
              <Tbody width="90dvw">
                {handleSearch().map((row, index) => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <Tr
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      width="90dvw"
                      mt={2}
                      onClick={() => navigateToCoinDetail(row.id)}
                      style={{ cursor: "pointer" }}
                      key={index}
                      height="100px"
                      bgColor="#101010"
                      borderBottom="1px solid #fff"
                    >
                      <Td borderBottom="none">
                        <Image
                          src={row.image}
                          alt={row.name}
                          borderRadius="full"
                          boxSize="40px"
                          mb={2}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span style={{ fontWeight: "600", fonSize: "22px" }}>
                            {row.symbol.toUpperCase()}
                          </span>
                          <span style={{ fontSize: "18px", color: "#606060" }}>
                            {row.name}
                          </span>
                        </div>
                      </Td>
                      <Td borderBottom="none">
                        <span style={{position: "absolute", left: "31%", top: "50%", bottom: "50%"}}>
                          {row.current_price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </span>
                      </Td>
                      <Td borderBottom="none">
                        <span
                          style={{
                            fontWeight: "700",
                            color:
                              profit > 0
                                ? theme.colors.green[600]
                                : theme.colors.red[600],
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      </Td>
                      <Td borderBottom="none">
                        <span>
                          {row.market_cap.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </span>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          )}
        </TableContainer>
      </Flex>
    </>
  );
};

export default CoinsTable;
