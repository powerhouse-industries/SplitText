var SplitText = (function () {

  // Setup some config items that can be overwritten later
  var config = {
    selector: '.split-me',
  };

  /**
   * Split the elements textContent
   *
   * @private
   * @param {string} element - The element beng split
   * @returns {function}
   */
  var _splitMe = function(element) {

    var span = element.getElementsByTagName('span');

    // Store the original text and empty the element
    var originalText = element.textContent;
    element.textContent = '';

    // Set up the new spans
    var spanSections = [];
    Array.prototype.forEach.call(originalText.split(' '), function(el) {
      var newSpan = document.createElement('span');
      newSpan.textContent = el;
      element.appendChild(newSpan);

      var index = newSpan.offsetTop - newSpan.scrollTop;

      if (spanSections[index] === undefined){
        spanSections[index] = '';
      }

      spanSections[index] += newSpan.textContent + ' ';

    });

    // Clear the originl element
    element.textContent = '';

    // repolulate the element
    for (var i = 0; i < spanSections.length; i++){
      if( spanSections[i] !== undefined ){
        var spanText = spanSections[i].trim();
        var newNewSpan = document.createElement('span');
        newNewSpan.textContent = spanText;
        element.appendChild(newNewSpan);
      }
    }

    Array.prototype.forEach.call(span, function(el) {
      var width = el.clientWidth - parseInt(window.getComputedStyle(el, null).getPropertyValue('padding-left'), 10) - parseInt(window.getComputedStyle(el, null).getPropertyValue('padding-right'), 10);
      el.setAttribute('style', 'width: ' + width + 'px');

      if (el.textContent === '') {
        el.parentNode.removeChild(el);
      }
    });

    // Add class for CSS hooks
    element.classList.add('has-split');
  }

  /**
   * The window.onresize function
   *
   * @private
   * @returns {function}
   */
  var _resize = function() {
    Array.prototype.forEach.call(document.querySelectorAll(config.selector), function (el, i) {
      el.classList.remove('has-split');

      var span = el.getElementsByTagName('span');

      // If we have any spans (onresize for example) remove them
      if (span.length > 0) {

        for (i = 0; i < span.length; i++) {

          span[i].insertAdjacentHTML('afterbegin', ' ');
          span[i].insertAdjacentHTML('beforeend', ' ');

          while(span[i].firstChild) span[i].parentNode.insertBefore(span[i].firstChild, span[i]);
          span[i].parentNode.removeChild(span[i]);
        }
      }

      _splitMe(el);
    });
  }

  /**
   * Initialise the SplitMe script
   *
   * @public
   * @returns {function}
   */
  var _init = function (options) {

    // override the default config
    for (var prop in options) {
      if (options.hasOwnProperty(prop)) {
        config[prop] = options[prop];
      }
    }

    Array.prototype.forEach.call(document.querySelectorAll(config.selector), function (el, i) {
      _splitMe(el);
    });

    window.addEventListener('resize', _resize);

  };

  return {
    init: _init
  };

})();
