'use strict';

/**
 * Restore <img> tags inside ```txt fenced blocks so images render,
 * while html/js/css and other languages stay escaped as source code.
 */
hexo.extend.filter.register('after_post_render', function (data) {
  if (!data.content) return data;

  data.content = restoreImgsInTxtBlocks(data.content, data);
  if (data.excerpt) {
    data.excerpt = restoreImgsInTxtBlocks(data.excerpt, data);
  }
  if (data.more) {
    data.more = restoreImgsInTxtBlocks(data.more, data);
  }

  return data;

  function restoreImgsInTxtBlocks(html, post) {
    return html.replace(
      /<figure class="highlight (txt|text|plaintext)">([\s\S]*?)<\/figure>/g,
      function (figure, lang, inner) {
        const restored = inner.replace(
          /&lt;img\s+((?:(?!&gt;).)*?)&gt;(?:&lt;\/img&gt;)?/gi,
          function (_, attrs) {
            const decoded = decodeEntities(attrs);
            const srcMatch = decoded.match(/\bsrc\s*=\s*(["'])([\s\S]*?)\1/i)
              || decoded.match(/\bsrc\s*=\s*([^\s>]+)/i);
            if (!srcMatch) {
              return '<img ' + decoded + '>';
            }
            const resolved = resolveSrc(srcMatch[2] || srcMatch[1], post);
            const rest = decoded
              .replace(/\bsrc\s*=\s*(["'])([\s\S]*?)\1/i, '')
              .replace(/\bsrc\s*=\s*([^\s>]+)/i, '')
              .trim();
            return rest
              ? '<img src="' + resolved + '" ' + rest + '>'
              : '<img src="' + resolved + '">';
          }
        );
        return '<figure class="highlight ' + lang + '">' + restored + '</figure>';
      }
    );
  }

  function decodeEntities(str) {
    return str
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, '&');
  }

  function resolveSrc(src, post) {
    src = src.trim();
    if (!src || /^(https?:)?\/\//i.test(src) || src.startsWith('data:')) {
      return src;
    }
    if (src.startsWith('/')) return src;

    const root = (hexo.config.root || '/').replace(/\/?$/, '/');
    const dir = String(post.path || '').replace(/[^/]+$/, '');
    const encoded = src.split('/').map(encodeURIComponent).join('/');
    return root + dir + encoded;
  }
});
