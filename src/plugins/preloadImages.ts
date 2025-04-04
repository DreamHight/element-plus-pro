import fs from 'fs';
import path from 'path';

export function preloadImages(options: any) {
  const assetsDirRelative = options.assetsDir || 'public';
  let publicDir: string = '';

  function getImageFiles(dirPath: string, basePath: string = './') {
    if (!fs.existsSync(dirPath)) {
      return [];
    }
    const files = fs.readdirSync(dirPath);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
    const imageFiles: string[] = [];
    files.forEach(file => {
      const filePath: string = path.join(dirPath, file);
      const relativePath: string = path.posix.join(basePath, file);
      if (fs.statSync(filePath).isDirectory()) {
        imageFiles.push(...getImageFiles(filePath, relativePath));
      } else if (imageExtensions.some(ext => file.toLowerCase().endsWith(ext))) {
        imageFiles.push(relativePath);
      }
    });
    return imageFiles;
  }

  return {
    name: 'preload-images',
    configResolved(config: any) {
      publicDir = config.root;
    },
    transformIndexHtml(html: any) {
      // const assetsDir = path.join(publicDir, assetsDirRelative);
      // const dirPath = path.join(process.cwd(), assetsDir);
      const dirPath = path.join(process.cwd(), assetsDirRelative);

      const imageFiles = getImageFiles(dirPath);
      // console.log('assetsDirassetsDir1', imageFiles, dirPath);

      // const preloadLinks = imageFiles.map(file => {
      //   const href = `/${path.posix.join(assetsDirRelative, file)}`
      //   // console.log('assetsDirassetsDir2', href);

      //   return `<link rel="preload" href="${href}" as="image">`
      // }).join('\n');
      // return html.replace(/<\/head>/, `${preloadLinks}\n</head>`);

      // return imageFiles.map(href => {
      //   return {
      //     tag: 'link',
      //     attrs: {
      //       rel: 'preload',
      //       as: 'image',
      //       href: `/${path.posix.join(assetsDirRelative, href)}`,
      //     },
      //   };
      // });
      return [
        {
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'image',
            href: '/bg_acl_rounded.png',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'image',
            href: '/bg_acl.png',
          },
        }
      ];
    }
    // transformIndexHtml(html, ctx) {
    //   const dirPath = path.join(process.cwd(), assetsDirRelative);

    //   const imageFiles = getImageFiles(dirPath);

    //   // const files = fg.sync(dir, {
    //   //   cwd: ctx.server?.config.publicDir
    //   // });
    //   const images = imageFiles.map(file => ctx.server?.config.base + file);
    //   return images.map(href => {
    //     return {
    //       tag: 'link',
    //       attrs: {
    //         rel: 'preload',
    //         as: 'image',
    //         href: href,
    //       },
    //     };
    //   });
    // },
  }
}