import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

const Loading = () => {
  return (
    <MoonLoader
      color="#15803D"
      cssOverride={null}
      loading
      size={60}
      speedMultiplier={0.6}
    />
  );
};

export default Loading;
