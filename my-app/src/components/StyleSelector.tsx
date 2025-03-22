
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface StyleOption {
  id: string;
  name: string;
}

interface StyleSelectorProps {
  styles: StyleOption[];
  activeStyle: string;
  onStyleChange: (styleId: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ 
  styles, 
  activeStyle, 
  onStyleChange 
}) => {
  // Find the name of the active style
  const activeStyleName = styles.find(style => style.id === activeStyle)?.name || 'Select Style';

  return (
    <div className="style-selector">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="style-dropdown-button">
            {activeStyleName} <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="style-dropdown-content">
          {styles.map((style) => (
            <DropdownMenuItem
              key={style.id}
              className={`style-dropdown-item ${activeStyle === style.id ? 'active' : ''}`}
              onClick={() => onStyleChange(style.id)}
            >
              {style.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default StyleSelector;
