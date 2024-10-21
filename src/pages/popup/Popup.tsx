import "@pages/popup/Popup.css";

const notebook = chrome.runtime.getURL("icon-128.png");

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={notebook} className="App-logo" />
        <p>LinkedIn Lazy Invite</p>
        <p>Integrate lazy invite button to the https://www.linkedin.com/</p>
      </header>
    </div>
  );
};

export default Popup;
