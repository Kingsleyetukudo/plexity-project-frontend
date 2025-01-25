import PropTypes from "prop-types";
const TitleBar = ({ title }) => {
  return (
    <div>
      <h1 className="font-extrabold text-xl md:text-3xl mb-5">{title}</h1>
    </div>
  );
};

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TitleBar;
