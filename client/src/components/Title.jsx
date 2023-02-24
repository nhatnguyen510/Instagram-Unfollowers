import { TypeAnimation } from "react-type-animation";

export const Title = () => {
  return (
    <TypeAnimation
      sequence={["Instagram Unfollowers", 2000, ""]}
      wrapper="h2"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: "2em", fontWeight: "bold", fontFamily: "Mynerve" }}
    />
  );
};
