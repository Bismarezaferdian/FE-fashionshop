// import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  display: flex;
  object-fit: cover;
`;

const Slider = ({ item }) => {
  return (
    <Container>
      <Image src={item} />
    </Container>
  );
};

export default Slider;
