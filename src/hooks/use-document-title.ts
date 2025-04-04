'use strict';

// 设置浏览器标签页中的title名称
export const useDocumentTitle = (title: string, name = '') => {
  let documentTitle: string = title;
  if (name) {
    documentTitle += ' - ' + name;
  }
  document.title = documentTitle;

  return documentTitle;
}