import { useEffect } from 'react';
import { themeChange } from 'theme-change';

const ThemeChanger = () => {
  useEffect(() => {
    themeChange(false);
  }, []);
  const themeValues = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
  ];
  return (
    <select
      className="select  max-w-xs rounded border border-gray-300"
      data-choose-theme
    >
      <option disabled value="">
        Pick a theme
      </option>
      {themeValues.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default ThemeChanger;
