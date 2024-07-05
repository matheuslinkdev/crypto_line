import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import { useTheme } from "@chakra-ui/react";
import CoinInfo from "../Components/CoinInfo";
import parse from "html-react-parser";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currency, symbol } = CryptoState();
  const theme = useTheme();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, [currency]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
      <aside
        style={{
          width: "400px",
          maxWidth: "95dvw",
          height: "70dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 25,
          borderRight: "2px solid gray",
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="150px"
          width="150px"
          style={{ marginBottom: "20px" }}
        />
        <h3
          style={{
            fontWeight: 600,
            marginBottom: 20,
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </h3>
        <p>{coin?.description && parse(coin.description.en.split(". ")[0])}.</p>
        <h4>Rank: {coin?.market_cap_rank}</h4>
        <h3>
          Current Price:{" "}
          {coin?.market_data.current_price[
            currency.toLowerCase()
          ].toLocaleString("en-US", {
            style: "currency",
            currency: currency,
          })}
        </h3>
        <h4>
          MarketCap:{" "}
          {coin?.market_data.market_cap[currency.toLowerCase()].toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          )}
        </h4>
      </aside>
      
      <article>
        <CoinInfo coin={coin} />
      </article>
    </div>
  );
};

export default CoinPage;
