/* eslint-disable */
export default class utils {
  static uniqueId(i) {
    if (!i) i = 8;
    return `x${Math.random().toString(36).slice(-i)}`;
  }

  static createElement(tagName, options) {
    const el = document.createElement(tagName);
    for (const key in options) {
      el.setAttribute(key, options[key]);
    }
    el.addClass = (c) => {
      el.className = `${el.className.split(' ').filter(cName => cName !== c).join(' ')} ${c}`;
    };
    el.removeClass = (c) => {
      el.className = el.className.split(' ').filter(cName => cName !== c).join(' ');
    };
    return el;
  }

  static objectToQuery(map) {
    const enc = encodeURIComponent;
    const pairs = [];

    for (const name in map) {
      const value = map[name];
      const assign = `${enc(name)}=`;
      if (value && (value instanceof Array || typeof value === 'array')) {
        for (let i = 0, len = value.length; i < len; ++i) {
          pairs.push(assign + enc(value[i]));
        }
      } else {
        pairs.push(assign + enc(value));
      }
    }
    return pairs.join('&');
  }

  static objectToFormData(data) {
    const form_data = new FormData();
    for (const key in data) {
      form_data.append(key, data[key]);
    }
    return form_data;
  }

   static loadStyles(url) {
    const cssId = encodeURIComponent(url);
    if (!document.getElementById(cssId)) {
      const head = document.getElementsByTagName('head')[0];
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = url;
      link.media = 'all';
      head.appendChild(link);
      return link;
    }
    return true;
  }

  static get getSrcUrl() {
    let srcURL = 'https://br-hnd-dlg.mybluemix.net/';// "https://ft-hmb-chat.mybluemix.net/";  //"https://prd-hmb-chat.mybluemix.net/"; //"https://dev-hmb-chat.mybluemix.net/";

    if (window.location.href.indexOf('localhost') !== -1
              || window.location.origin.indexOf('192') !== -1) {
      srcURL = `${window.location.origin}/`;
    } else if (window.location.href.indexOf('teste') !== -1
              || window.location.origin.indexOf('ft-hmb-chat') !== -1) {
      srcURL = 'https://ft-hmb-chat.mybluemix.net/';
    }

    return srcURL;
  }

  static get getImgUrl() {
    return `${Utils.getSrcUrl}images/web-chat/`;
  }

  static getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => { resolve(position); },
          (err) => { reject(err); },
        );
      } else {
        reject(false);
      }
    });
  }
}
