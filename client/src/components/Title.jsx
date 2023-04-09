import { TypeAnimation } from "react-type-animation";

export const Title = () => {
  return (
    <TypeAnimation
      sequence={["Instagram Unfollowers", 2000, ""]}
      cursor={true}
      repeat={Infinity}
      style={{ fontFamily: "Mynerve" }}
    />
  );
};
