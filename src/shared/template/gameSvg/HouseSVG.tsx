const HouseSVG = () => {
  return (
    <svg
      width={15}
      height={15}
      id="Icons"
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="New_Gradient_Swatch_1"
          x1="3.75"
          x2="124.16"
          y1="64.51"
          y2="64.51"
        >
          <stop offset="0" stopColor="#67a3ff" />
          <stop offset="1" stopColor="#418cff" />
        </linearGradient>
      </defs>
      <path
        fill="url(#New_Gradient_Swatch_1)"
        className="cls-1"
        d="M123,62.5l-.13-.14-56-52.19a4.29,4.29,0,0,0-5.7-.13L4.94,62.5a4.23,4.23,0,0,0-.76,4.8A5,5,0,0,0,8.71,70H22l-.1,45.81a2.31,2.31,0,0,0,.06.52A4.87,4.87,0,0,0,26.82,120h74.27a4.88,4.88,0,0,0,4.86-3.67,3.05,3.05,0,0,0,0-.52L105.9,70h13.3a5,5,0,0,0,4.53-2.7A4.25,4.25,0,0,0,123,62.5Z"
      />
    </svg>
  );
};

export { HouseSVG };
