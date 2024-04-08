import { useTheme } from "@chakra-ui/react";
import Banner from "../Components/Banner/Banner";
import CoinsTable from "../Components/CoinsTable";

const Home = () => {
  const theme = useTheme();

  return (
    <>
      <Banner />
     <CoinsTable/> 
    </>
  );
};

export default Home;
