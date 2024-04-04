import { useTheme } from "@chakra-ui/react";
import Banner from "../Components/Banner/Banner";

const Home = () => {
  const theme = useTheme();

  return (
    <>
      <Banner />
    </>
  );
};

export default Home;
