import React, { useState, useEffect } from 'react';

interface DynamicIconComponentProps {
  iconName: string;
  iconSet?: string;
}

const loadDynamicIcon: React.FC<DynamicIconComponentProps> = ({ iconName, ...props }) => {
  const [Icon, setIcon] = useState<React.ElementType>(() => null);

  useEffect(() => {
    const importIcon = async () => {
      if (props.iconSet === 'remixicon') {
        try {
          const module = await import(`@remixicon/react/${iconName}`);
          setIcon(() => module.default);
        } catch (error) {
          console.error(`Could not load icon ${iconName}:`, error);
        }
      }
    };

    importIcon();
  }, [iconName]);

  return Icon ? <Icon {...props} /> : null;
};

export default loadDynamicIcon;

