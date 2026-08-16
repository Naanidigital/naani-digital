import { Link } from "react-router-dom";

interface InternalLinkBlockProps {
  text: string;
  linkUrl: string;
  linkTitle: string;
  anchorText: string;
}

const InternalLinkBlock = ({ text, linkUrl, linkTitle, anchorText }: InternalLinkBlockProps) => {
  return (
    <div className="internal-link-block">
      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
        {text}{" "}
        <Link 
          to={linkUrl} 
          title={linkTitle}
          className="text-accent hover:text-accent/80 underline underline-offset-2 transition-colors font-medium"
        >
          {anchorText}
        </Link>.
      </p>
    </div>
  );
};

export default InternalLinkBlock;
