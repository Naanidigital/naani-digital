import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

const WHATSAPP_NUMBER = "919493943946";

const MESSAGE =
  "Hi Naani Projects, I am interested in knowing more about your properties. Please share the details.";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    MESSAGE
  )}`;

  return (
    <a
      href={whatsappUrl}
      className="naani-floating-whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Naani Projects on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp
        className="naani-whatsapp-icon"
        aria-hidden="true"
      />
    </a>
  );
}
