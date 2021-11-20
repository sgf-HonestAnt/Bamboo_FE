import Logo from "../../media/logo.png";

const PandaLogo = () => (
  <img
    src={Logo}
    // src={process.env.REACT_APP_LOGO_IMG}
    alt='Panda Logo'
    className='img-fluid'
  />
);

export default PandaLogo;
