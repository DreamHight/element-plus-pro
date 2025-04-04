import type { Plugin } from 'vite';
import fg from 'fast-glob';

interface OptionsParams {
  dir: string;
  attrs: {
    rel: 'prefetch' | 'preload';
  };
}

export const preloadImagePlugin = (options: OptionsParams): Plugin => {
  const { dir, attrs } = options;
  return {
    name: 'vite-plugin-pre-fetch-load-image',
    transformIndexHtml(html, ctx) {
      // return [
      //   {
      //     tag: 'link',
      //     attrs: {
      //       rel: 'preload',
      //       as: 'image',
      //       href: '/bg_acl_rounded.png',
      //     },
      //   },
      //   {
      //     tag: 'link',
      //     attrs: {
      //       rel: 'preload',
      //       as: 'image',
      //       href: '/bg_acl.png',
      //     },
      //   }
      // ];

      const files = fg.sync(dir, {
        cwd: ctx.server?.config.publicDir
      });
      const images = files.map(file => ctx.server?.config.base + file);
      console.log('images', images);
      
      return images.map(href => {
        return {
          tag: 'link',
          attrs: {
            rel: attrs.rel,
            as: 'image',
            href: href,
          },
        };
      });
    },
  }
}