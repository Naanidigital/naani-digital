import { Phone, MessageCircle } from "lucide-react";

interface ProjectHeaderProps {
  projectName: string;
  onEnquireClick?: () => void;
}

const ProjectHeader = ({ projectName }: ProjectHeaderProps) => {
  const waLink = `https://wa.me/919705080909?text=${encodeURIComponent(`Hi, I am interested in ${projectName}. Please share details.`)}`;

  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-end px-4 md:px-8 py-4 bg-slate-950/80 backdrop-blur-sm border-b border-amber-600/20">
      <div className="flex items-center gap-3">
        <a
          href="tel:+919705080909"
          className="call-btn hidden md:flex items-center gap-1.5 text-white text-sm font-medium hover:text-amber-300 transition-colors"
        >
          <Phone size={16} className="text-amber-400" />
          <span>+91 97050 80909</span>
        </a>
        <a
          href="tel:+919705080909"
          className="call-btn md:hidden flex items-center gap-1.5 text-white text-sm font-medium"
        >
          <Phone size={14} />
        </a>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn flex items-center gap-2 text-white text-sm font-semibold bg-green-700/80 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
        >
          <MessageCircle size={15} />
          WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ProjectHeader;
