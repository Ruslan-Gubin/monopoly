import {  ViewerAvatar } from "@/entities";
import { useViewerFeatures } from "../../model";


const ProfileAvatar = () => {
  const { activeFoto } = useViewerFeatures();

  return (
      <ViewerAvatar
      image={activeFoto ? activeFoto : ''}
      size="lg"
      />
  );
};

export { ProfileAvatar };