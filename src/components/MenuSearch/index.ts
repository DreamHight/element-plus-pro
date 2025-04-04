import type { IMenuItem } from "../typings/menu";

// 递归获取搜索到的最后一级子菜单项
export const recursionToGetMenuItems = (
  dataTree: IMenuItem[],
  text: string,
  pinyinSearch: boolean = false,
  searchKey: string = 'title'
): IMenuItem[] => {
  const result: IMenuItem[] = [];
  const recurse = (list: IMenuItem[]): void => {
    list.forEach((item: IMenuItem) => {
      if (pinyinSearch) {
        const pinyin = item.pinyin || '';
        if (
          pinyin.toLowerCase().includes(text.toLowerCase()) ||
          item[searchKey].toLowerCase().includes(text.toLowerCase())
        ) {
          result.push({ ...item });
        }
      } else {
        if (item[searchKey].toLowerCase().includes(text.toLowerCase())) {
          result.push({ ...item });
        }
      }
      if (Array.isArray(item.children) && item.children.length > 0) {
        recurse(item.children);
      } else if (Array.isArray(item.group) && item.group.length > 0) {
        recurse(item.group);
      }
    });
  };
  recurse(dataTree);

  // (function recurse(list: IMenuItem[]): void {
  //   list.forEach((item: IMenuItem) => {
  //     if (item.title.toLowerCase().includes(text.toLowerCase())) {
  //       result.push(item);
  //     }
  //     if (Array.isArray(item.children) && item.children.length > 0) {
  //       recurse(item.children);
  //     } else if (Array.isArray(item.group) && item.group.length > 0) {
  //       recurse(item.group);
  //     }
  //   });
  // })(dataTree);

  return result;
}
// 递归获取最后一级的子菜单项
export const recursionToGetLastMenuItem = (dataTree: IMenuItem[]): IMenuItem[] => {
  const result: IMenuItem[] = [];
  (function recurse(list: IMenuItem[]): void {
    list.forEach((item: IMenuItem) => {
      if (Array.isArray(item.children) && item.children.length > 0) {
        recurse(item.children);
      } else if (Array.isArray(item.group) && item.group.length > 0) {
        recurse(item.group);
      } else {
        result.push({ ...item });
      }
    });
  })(dataTree);
  return result;
}
// 递归获取最顶一级的父菜单项（包含其他的菜单项）
export const recursionToGetTopMenusWith = (dataTree: IMenuItem[], menuItems: IMenuItem[]): IMenuItem[] => {
  const result: IMenuItem[] = [];
  const recurse = (list: IMenuItem[], parentId: string | null): void => {
    list.forEach((item: IMenuItem) => {
      if (item.id === parentId) {
        if (item.parentId) {
          recurse(dataTree, item.parentId);
        } else {
          const idx = result.findIndex(obj => obj.id === item.id);
          if (idx < 0) {
            result.push({ ...item });
          }
        }
      } else {
        if (Array.isArray(item.children) && item.children.length > 0) {
          recurse(item.children, parentId);
        } else if (Array.isArray(item.group) && item.group.length > 0) {
          recurse(item.group, parentId);
        }
      }
    });
  };
  menuItems.forEach(item => {
    recurse(dataTree, item.parentId);
  });

  return result.length ? result : menuItems;
}
// 递归获取最顶一级的父菜单项（不包含其他的菜单项）
export const recursionToGetTopMenusWithout = (dataTree: IMenuItem[], menuItems: IMenuItem[]): IMenuItem[] => {
  const result: IMenuItem[] = [ ...menuItems ];
  const recurse = (list: IMenuItem[], parentId: string | null): void => {
    list.forEach((item: IMenuItem) => {
      if (item.id === parentId) {
        const { children, ...rest } = item;
        result.push({ ...rest });
        recurse(dataTree, item.parentId);
      } else {
        if (Array.isArray(item.children) && item.children.length > 0) {
          recurse(item.children, parentId);
        } else if (Array.isArray(item.group) && item.group.length > 0) {
          recurse(item.group, parentId);
        }
      }
    });
  };
  menuItems.forEach(item => {
    recurse(dataTree, item.parentId);
  });

  return result.length ? result.reverse() : menuItems;
}
// 递归获取上一级的父菜单项
export const recursionToGetTopMenus = (dataTree: IMenuItem[], menuItems: IMenuItem[]): IMenuItem[] => {
  const result: IMenuItem[] = [];
  const recurse = (list: IMenuItem[], parentId: string | null): void => {
    list.forEach((item: IMenuItem) => {
      if (item.id === parentId) {
        const idx = result.findIndex(obj => obj.id === item.id);
        if (idx < 0) {
          result.push({ ...item });
        }
      } else {
        if (Array.isArray(item.children) && item.children.length > 0) {
          recurse(item.children, parentId);
        } else if (Array.isArray(item.group) && item.group.length > 0) {
          recurse(item.group, parentId);
        }
      }
    });
  };
  menuItems.forEach(item => {
    recurse(dataTree, item.parentId);
  });

  return result.length ? result : menuItems;
}
// 将菜单树结构扁平化成列表结构
export const recursionMenuTreeToMenuList = (dataTree: IMenuItem[]): IMenuItem[] => {
  const result: IMenuItem[] = [];
  const recurse = (list: IMenuItem[]): void => {
    list.forEach((item: IMenuItem) => {
      result.push({ ...item });
      if (Array.isArray(item.children) && item.children.length > 0) {
        recurse(item.children);
      } else if (Array.isArray(item.group) && item.group.length > 0) {
        recurse(item.group);
      }
    });
  };
  recurse(dataTree);

  return result;
}