import "./style/loader.css";



function Loader() {
  return (
<div className="loader-container">

  <div className="loader-bg"></div>

  <div className="loader-content">

    <img
       src="/logo/loadingLogo.png"
      alt="UrbanCart"
      className="loader-logo"
    />

  </div>

</div>
  );
}

export default Loader;