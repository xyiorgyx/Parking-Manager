import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import{getUser} from ""

const QrCode = () => {
  const [url, setUrl] = useState("");

  const downloadQRCode = (e) => {
    e.preventDefault();
    setUrl(getUser());
  };
  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      bgColor={"#00ff00"}
      level={"H"}
    />
  );
  return (
    <div className="qrcode__container">
      <div>{qrcode}</div>
      <div className="input__group">
        <form onSubmit={downloadQRCode}>
          <label>Generate QrCode</label>
          <button type="submit" >
            Download QR code
          </button>
        </form>
      </div>
    </div>
  );
};

export default QrCode;