import React, { FC, memo } from 'react';
import './SearchIcon.css';

interface SearchIconProps {
  onClick?: () => void
  className?: string
}

const SearchIcon: FC<SearchIconProps> = memo(({className, onClick}) => {
  const rootClasses = ['search-icon__container']

  if (className) {
    rootClasses.push(className)
  }

  return (
    <div onClick={onClick} className={rootClasses.join(' ')}>
    </div>
  );
});

SearchIcon.displayName = 'SearchIcon';

export { SearchIcon };