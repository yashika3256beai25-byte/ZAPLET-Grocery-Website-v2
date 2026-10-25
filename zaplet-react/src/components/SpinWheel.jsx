import { useEffect, useRef, useState } from "react";
import { prizes } from "../data/siteData";

export default function SpinWheel({ open, onClose, showToast }) {
  const [alreadySpun, setAlreadySpun] = useState(false);
  const [rotation, setRotation] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");
  const timerRef = useRef(null);

  // The original cleared the result text every time the wheel was opened.
  useEffect(() => {
    if (open) setResult("");
  }, [open]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  function spinWheel() {
    if (alreadySpun) {
      showToast("You already used your free spin");
      return;
    }
    const index = Math.floor(Math.random() * prizes.length);
    setAlreadySpun(true);
    setSpinning(true);
    setRotation(1440 + index * 45);

    timerRef.current = setTimeout(() => {
      setSpinning(false);
      setResult("🎉 Congratulations! You won " + prizes[index] + "!");
      showToast(prizes[index]);
    }, 3100);
  }

  let buttonText = "Spin Now";
  if (spinning) buttonText = "Spinning...";
  else if (alreadySpun) buttonText = "Prize Won!";

  return (
    <div className={"overlay" + (open ? " show" : "")} id="wheelBox">
      <div className="modal">
        <button className="close-x" onClick={onClose}>X</button>
        <h3>Spin &amp; Win!</h3>
        <p>One free spin per visit</p>
        <div className="wheel-wrap">
          <div className="pointer">v</div>
          <div className="wheel" id="wheel" style={rotation === null ? undefined : { transform: "rotate(" + rotation + "deg)" }}>
            <span className="wheel-label label-1">₹50 OFF</span>
            <span className="wheel-label label-2">FREE<br />DELIVERY</span>
            <span className="wheel-label label-3">10% OFF</span>
            <span className="wheel-label label-4">TRY<br />AGAIN</span>
            <span className="wheel-label label-5">₹100 OFF</span>
            <span className="wheel-label label-6">5% OFF</span>
            <span className="wheel-label label-7">20% OFF</span>
            <span className="wheel-label label-8">FREE<br />GIFT</span>
          </div>
        </div>
        <button className="green-btn" id="spinBtn" onClick={spinWheel} disabled={alreadySpun}>{buttonText}</button>
        <p id="wheelResult">{result}</p>
      </div>
    </div>
  );
}
