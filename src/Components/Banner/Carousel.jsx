import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { Heading, Icon, Text, useTheme } from "@chakra-ui/react";
import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";

const TrendingCoinsURL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const { data } = await axios.get(TrendingCoinsURL);
        if (data && Array.isArray(data)) {
          setTrending(data);
        } else {
          console.error(
            "Os dados retornados da API não estão no formato esperado:",
            data
          );
          setTrending([]);
        }
      } catch (error) {
        console.error("Erro ao buscar moedas em tendência:", error);
        setTrending([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingCoins();
    const interval = setInterval(fetchTrendingCoins, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const items = trending.slice(0, 15).map((coin, index) => {
    const profit = coin.price_change_percentage_24h >= 0;
    // Use regex para formatar as casas decimais
    const formattedPrice = coin.current_price
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return (
      <Link
        to={`/coins/${coin.id}`}
        key={index}
        style={{
          margin: "0 2vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={coin.image}
          alt={`${coin.name} image`}
          style={{ marginBottom: 10, height: "70px" }}
        />
        <Heading size="md" fontFamily="Raleway" fontWeight={300}>
          {coin.name}
        </Heading>
        <Text size="md" fontFamily="Montserrat" mb={5} mt={2} fontSize="18px">
          {`$ ${formattedPrice}`}
        </Text>
        <span
          style={{
            color: profit ? theme.colors.green[600] : theme.colors.red[600],
            fontWeight: "600",
            fontSize: "18px",
            fontFamily: "Montserrat",
          }}
        >
          {profit && "+"}
          {coin.price_change_percentage_24h.toFixed(2)}%
        </span>
      </Link>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  return (
    <div
      style={{
        height: "50%",
        width: "70vw",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        animationDuration={5000}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
