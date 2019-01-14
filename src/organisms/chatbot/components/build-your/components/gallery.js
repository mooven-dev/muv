import Utils from '../helper/utils';

class Gallery {
  constructor() {
    this.state = {};
    this.arrowLeft = 0;
    this.arrowRight = 1;

    this.animate = ($el, pos, side) => {
      let frameAnimate = 0;
      const seconds = 1000;
      const frameRate = seconds / 50;
      const posInteration = Math.round(pos / frameRate);
      let animateInterval = null;

      animateInterval = setInterval(() => {
        let nextInteration = posInteration;
        if (frameAnimate >= pos) {
          clearInterval(animateInterval);
        }
        if ((frameAnimate + posInteration) > pos) {
          nextInteration = pos - frameAnimate;
        }
        $el.scrollBy(nextInteration * side, 0);
        frameAnimate += nextInteration;
      }, frameRate);
    };

    this.widthPerItem = ($el, total) => $el.scrollWidth / total;


    this.moveCarousel = (next, $el, total) => {
      const side = next ? 1 : -1;
      const pos = this.widthPerItem($el, total);
      this.animate($el, Math.round(pos), side);
    };

    this.positionGallery = ($el, total) => {
      const perItem = this.widthPerItem($el, total);
      const pos = $el.scrollLeft / perItem;
      $el.scroll(Math.round(pos) * perItem, 0);
    };

    this.registerEvents = (el, total) => {
      const $arrowLeft = el.querySelector('.wch-arrow-left');
      const $arrowRight = el.querySelector('.wch-arrow-right');
      const $wrapOver = el.querySelector('.wch-gallery-wrap');
      let timeout;

      $arrowLeft.addEventListener('click', () => {
        this.moveCarousel(false, $wrapOver, total);
      });

      $arrowRight.addEventListener('click', () => {
        this.moveCarousel(true, $wrapOver, total);
      });

      $wrapOver.addEventListener('scroll', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.positionGallery($wrapOver, total);
        }, 300);
      });
    };

    this.renderHTML = () => (`
    <div className="wch-gallery">
      <div className="wch-gallery-arrow wch-arrow-left" />
      <div className="wch-gallery-arrow wch-arrow-right" />
      <div className="wch-gallery-wrap">
        <div className="wch-gallery-wrap-overflow" />
      </div>
    </div>
    `
    );

    this.renderFunc = (children) => {
      const total = children.length;
      const el = Utils.createElementFromHTML(this.renderHTML());
      const wrap = el.querySelector('.wch-gallery-wrap-overflow');
      wrap.style = `width:${total}00%`;
      children.forEach((child) => {
        const item = Utils.createElement('div', { class: 'wch-gallery-item' });
        item.style = `width:${(1 / total * 100)}%`;
        item.append(child);
        wrap.append(item);
      });
      this.registerEvents(el, total);
      return el;
    };
  }
}

export default Gallery;
