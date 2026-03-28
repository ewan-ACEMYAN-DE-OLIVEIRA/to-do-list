// Modal.jsx
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  modal: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    minWidth: "400px",
    position: "relative"
  },
  closeBtn: {
    position: "absolute",
    top: "1rem", right: "1rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem"
  }
}