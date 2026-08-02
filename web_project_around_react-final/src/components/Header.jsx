import logo from "../images/Vector.png";
import line from "../images/Line.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Around the U.S." className="header__logo" />

      <img src={line} alt="Línea divisoria" className="header__linee" />
    </header>
  );
}

export default Header;
