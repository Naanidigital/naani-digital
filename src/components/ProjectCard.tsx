import { Link } from "react-router-dom";
import { MapPin, MessageCircle, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProjectImage from "@/components/ProjectImage";
import { projectPath, type DBProject } from "@/lib/projectsApi";

const waLink = (name: string) =>
  `https://wa.me/919705080909?text=${encodeURIComponent(`Hi, I'm interested in ${name}. Please share details.`)}`;

interface Props {
  project: DBProject;
  index?: number;
}

const ProjectCard = ({ project, index = 0 }: Props) => {
  const path = projectPath(project);
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 6) * 0.05, duration: 0.4 }}
      className="group glass-card overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
    >
      <div>
        <Link to={path} className="block">
          <div className="relative h-56 overflow-hidden bg-slate-900">
            <ProjectImage
              hero={project.hero_image}
              gallery={project.gallery}
              slug={project.slug}
              name={project.name}
              alt={`${project.name} — ${project.property_type ?? "property"} in ${project.location}, Hyderabad`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {project.status && (
              <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                {project.status}
              </span>
            )}
            {project.featured && (
              <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur text-amber-400 border border-amber-500/30 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Star size={11} className="fill-amber-400" /> Featured
              </span>
            )}
          </div>
        </Link>

        <div className="p-6 space-y-3">
          <Link to={path}>
            <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
              {project.name}
            </h3>
          </Link>
          {project.builder && (
            <p className="text-xs text-amber-400 font-bold -mt-2">by {project.builder}</p>
          )}
          <div className="flex items-center gap-1.5 text-slate-300 font-medium text-sm">
            <MapPin size={16} className="text-amber-400" /> {project.location}, {project.city}
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="text-center bg-slate-900/80 rounded-xl p-2.5 border border-amber-500/20">
              <p className="text-[10px] font-bold text-amber-400 uppercase">Config</p>
              <p className="text-xs md:text-sm font-bold text-white line-clamp-1">{project.configuration || "—"}</p>
            </div>
            <div className="text-center bg-slate-900/80 rounded-xl p-2.5 border border-amber-500/20">
              <p className="text-[10px] font-bold text-amber-400 uppercase">Possession</p>
              <p className="text-xs md:text-sm font-bold text-white">{project.possession?.slice(0, 7) || "—"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="flex items-center justify-between pt-4 border-t border-amber-500/20">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Starting From</p>
            <p className="text-lg font-extrabold text-amber-400">{project.price_range || "On Request"}</p>
          </div>
          <div className="flex gap-2">
            <a
              href={waLink(project.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md flex items-center justify-center"
              aria-label={`WhatsApp about ${project.name}`}
            >
              <MessageCircle size={18} />
            </a>
            <Link to={path}>
              <Button size="sm" className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold rounded-xl h-11 px-4 shadow-md">
                View <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
