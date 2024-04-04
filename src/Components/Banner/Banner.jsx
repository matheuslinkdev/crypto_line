import { Container, Heading, Text } from "@chakra-ui/react";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div style={{ backgroundImage: "url(./background.jpg)" }}>
      <Container
        style={{
          height: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "25px",
          justifyContent: "space-around",
        }}
      >
        <section
          style={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Heading size="xl" fontFamily="Raleway" mb={15}>
            CryptoLine
          </Heading>
          <Text size="xl" fontFamily="Raleway">
            Get infos about the Crypto Currency
          </Text>
        </section>
        <Carousel/>
      </Container>
    </div>
  );
};

export default Banner;
