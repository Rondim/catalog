export const MENU_CLICKED = 'MENU_CLICKED';

export const onMenuClick = (menuName) => {
  return {
    type: MENU_CLICKED,
    menuName
  };
};
