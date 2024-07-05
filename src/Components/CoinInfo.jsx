import { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import LinearLoader from "./Loader/LinearLoader";
import { Line } from "react-chartjs-2";

const CoinInfo = ({ coin }) => {
  const [prices, setPrices] = useState([]);

  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart( currency));
      console.log(data.prices.slice(-7));
      setPrices(data.prices.slice(-7));
    } catch (error) {
      console.error("Error fetching historic data:", error);
    }
  };

  useEffect(() => {
    fetchHistoricData();
  }, [currency]);

  return (
    <div
      style={{
        width: "800px",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
      }}
    >
      {prices.map((price, index)=>{
        return(
          <li key={index}>
            {price[1].toLocaleString()}
          </li>
        )
      })}
    </div>
  );
};

export default CoinInfo;
