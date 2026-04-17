const Logo = ({ width = "100px" }) => {
  return (
    <div
      style={{ width }}
      className="flex items-center justify-center bg-linear-to-br from-purple-500 to-violet-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <span style={{ fontSize: `calc(${width} * 0.3)` }}>Blog</span>
    </div>
  );
};

export default Logo;
