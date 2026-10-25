import { useEffect, useState } from "react";
import { riders } from "../data/siteData";

const steps = [
  { title: "Order Placed", text: "We've received your order" },
  { title: "Packing Your Order", text: "Getting everything ready" },
  { title: "Out for Delivery", text: "Your order is on its way" },
  { title: "Delivered", text: "Enjoy your order!" },
];

// What the tracker shows at each stage: which step is active, its status, and the rider message.
const stages = [
  { step: 2, status: "now", message: "Your order has been received and is being prepared." },
  { step: 3, status: "now", message: "Your order is on its way!" },
  { step: 4, status: "now", message: "Your order is almost there!" },
  { step: 4, status: "done", message: "Your order has been delivered. Enjoy!" },
];

function formatTime(seconds) {
  if (seconds <= 0) return "00:00";
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return min + ":" + (sec < 10 ? "0" : "") + sec;
}

export default function OrderTracking({ open, onClose, customerName, orderKey }) {
  const [rider, setRider] = useState(riders[0]);
  const [orderNo, setOrderNo] = useState("000000");
  const [stage, setStage] = useState(0);
  const [seconds, setSeconds] = useState(20 * 60);

  // Start a fresh tracking run when the modal opens; stop all timers when it closes or unmounts.
  useEffect(() => {
    if (!open) return;

    setRider(riders[Math.floor(Math.random() * riders.length)]);
    setOrderNo(String(100000 + Math.floor(Math.random() * 900000)));
    setStage(0);
    setSeconds(20 * 60);

    const interval = setInterval(() => setSeconds((s) => Math.max(s - 1, 0)), 1000);
    const t1 = setTimeout(() => setStage(1), 5000);
    const t2 = setTimeout(() => setStage(2), 12000);
    const t3 = setTimeout(() => { setStage(3); clearInterval(interval); }, 22000);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [open, orderKey]);

  const current = stages[stage];
  const delivered = stage === 3;

  function stepState(number) {
    if (number < current.step) return " done";
    if (number === current.step) return " " + current.status;
    return "";
  }

  return (
    <div className={"overlay" + (open ? " show" : "")} id="trackBox">
      <div className="modal track">
        <div className="track-top">
          <div className="track-icon">📦</div>
          <button className="close-x" onClick={onClose} aria-label="Close tracking">X</button>
        </div>

        <h2 id="trackTitle">{delivered ? "Delivered! Enjoy 🎉" : "Order Confirmed!"}</h2>

        <p className="track-order-info">
          Order ID: <b id="orderId">#ZAP-{orderNo}</b>
        </p>

        <p className="track-customer" id="trackName">{customerName ? "Customer: " + customerName : ""}</p>

        <div className="eta-box">
          <span className="eta-label">Estimated delivery countdown</span>
          <div className="timer" id="eta">{delivered ? "Done" : formatTime(seconds)}</div>
          <p id="riderText" aria-live="polite">{current.message}</p>
        </div>

        <div className="rider">
          <div className="avatar" id="riderInit">{rider.init}</div>
          <div className="rider-details">
            <b id="riderName">{rider.name}</b>
            <p>Zaplet Delivery Partner</p>
            <span id="riderRate">{rider.info}</span>
          </div>
        </div>

        <div className="track-progress">
          <h3>Order progress</h3>
          <div className="steps">
            {steps.map((s, i) => {
              const number = i + 1;
              const state = stepState(number);
              return (
                <div className={"track-step" + state} id={"step" + number} key={number}>
                  <span className="step-marker">{state === " done" ? "✓" : number}</span>
                  <div className="step-content">
                    <b>{s.title}</b>
                    <span>{s.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button className="green-btn track-close-btn" onClick={onClose}>Continue Shopping</button>

        <p className="track-note">Thank you for shopping with ZAPLET!</p>
      </div>
    </div>
  );
}
