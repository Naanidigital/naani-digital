import { useState, useCallback } from "react";

export const useLeadPopup = (defaultProject?: string) => {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("General");
  const [projectName, setProjectName] = useState(defaultProject || "");

  const openPopup = useCallback(
    (src: string, project?: string) => {
      setSource(src);
      if (project) setProjectName(project);
      setOpen(true);
    },
    []
  );

  return { open, setOpen, source, projectName, openPopup };
};
