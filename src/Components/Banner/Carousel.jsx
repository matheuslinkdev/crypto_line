import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Heading, Text, useTheme } from "@chakra-ui/react";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../config/api";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency, symbol } = CryptoState();
  const theme = useTheme();

   const fetchTrendingCoins = async () => {
     const { data } = await axios.get(TrendingCoins(currency));

     console.log(data);
     setTrending(data);
   };

    useEffect(() => {
      fetchTrendingCoins();
    }, [currency]);


  const items = trending.slice(0, 15).map((coin, index) => {
    const profit = coin.price_change_percentage_24h >= 0;
  
    const formattedPrice = coin.current_price.toLocaleString("en-US", {
      style: "currency",
      currency: currency,
    });

    return (
      <li
        
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
          {`${formattedPrice}`}
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
      </li>
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
