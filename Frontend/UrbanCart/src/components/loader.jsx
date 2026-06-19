import "./style/loader.css";

function Loader() {
  return (
    <div className="loader-container">

      <div className="loader-content">

        <img
           src="/logo/loadingLogo.png"
          alt="UrbanCart"
          className="loader-logo"
        />

        <p className="loader-text">
          Loading Luxury Experience...
        </p>

      </div>

    </div>
  );
}

export default Loader;