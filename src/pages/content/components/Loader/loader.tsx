const notebook = chrome.runtime.getURL("images/notebook.gif");

export const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        justifyContent: "center",
      }}
    >
      <div>
        <img width="80px" src={notebook} />
      </div>
      <div style={{ fontSize: "18px", width: "330px" }}>Sending invites</div>
    </div>
  );
};
