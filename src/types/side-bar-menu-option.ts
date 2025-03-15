type SideBarMenuOption = {
  path: string;
  icon?: string;
  label: string;
  subOptions?: SideBarMenuOption[];
  hasDropDown?: boolean;
};

export type { SideBarMenuOption };
