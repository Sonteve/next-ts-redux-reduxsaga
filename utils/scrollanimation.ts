import { DOMElement, ReactElement, RefObject } from "react";

/**
 * Animate scrolling to a target position
 * @param {string} _selector Target selector
 * @param {number} _duration (Option) Duration time(ms) (Default. 800ms)
 * @param {number} _adjust (Option) Adjustment value of position
 */
export function animteScrollTo(
  _selector: string,
  _duration: any,
  _adjust: any
) {
  const targetEle: any = document.querySelector(_selector);
  if (!targetEle) return;

  // - Get current &amp; target positions
  const scrollEle = document.documentElement || window.scrollingElement,
    currentY = scrollEle.scrollTop,
    targetY: any = targetEle.offsetTop - (_adjust || 0);
  animateScrollTo(currentY, targetY, _duration);

  // - Animate and scroll to target position
  function animateScrollTo(_startY: any, _endY: any, _duration: any) {
    _duration = _duration ? _duration : 600;
    const unitY = (targetY - currentY) / _duration;
    const startTime = new Date().getTime();
    const endTime = new Date().getTime() + _duration;

    const scrollTo = function () {
      let now = new Date().getTime();
      let passed = now - startTime;
      if (now <= endTime) {
        scrollEle.scrollTop = currentY + unitY * passed;
        requestAnimationFrame(scrollTo);
      } else {
        console.log("End off.");
      }
    };
    requestAnimationFrame(scrollTo);
  }
}
