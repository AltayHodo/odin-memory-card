export default function Modal({ message, onReset }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{message}</h2>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}