import { UserAvatar } from "@/shared";
import { FC } from "react";
import { useViewer } from "../../model";


interface ViewerAvatarProps {
  image?: string;
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  title?: string
}

const ViewerAvatar: FC<ViewerAvatarProps> = ({size='sm', image, onClick, title}) => {
  const { viewer } = useViewer()

  return (
    <UserAvatar 
    image={image ? image : viewer ? viewer.image?.url : ''}
    size={size}
    onClick={onClick}
    title={title}
    />
  );
};

export { ViewerAvatar };