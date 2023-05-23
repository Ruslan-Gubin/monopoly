import { useViewer, ViewerAvatar } from "@/entities";
import { useViewerFeatures } from "../../model";


const ProfileAvatar = () => {
  const { viewer } = useViewer();
  const { activeFoto } = useViewerFeatures();

  return (
      <ViewerAvatar
      image={activeFoto ? activeFoto : viewer ? viewer.image.url : ''}
      size="lg"
      />
  );
};

export { ProfileAvatar };