var SplitText = (function () {

  var originalText = '';

  // Setup some config items that can be overwritten later
  var config = {
    selector: '[data-js="split-me"]',
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
    originalText = element.textContent;
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

      el.classList.add('split-item');
    });

    // Add class for CSS hooks
    element.classList.add('has-split');
  };

  /**
   * The window.onresize function
   *
   * @private
   * @returns {function}
   */
  var _resize = function() {
    var elements = document.querySelectorAll(config.selector);

    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];

      el.classList.remove('has-split');

      var span = el.querySelectorAll('span');

      for (var i = 0; i < span.length; i++) {
        var parent = span[i].parentNode;

        span[i].insertAdjacentHTML('beforeend', ' ');

        while (span[i].firstChild) parent.insertBefore(span[i].firstChild, span[i]);
        parent.removeChild(span[i]);
      }

      // Merge text nodes into one
      el.normalize();

      _splitMe(el);

    }
  };

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

    setTimeout(function () {
      Array.prototype.forEach.call(document.querySelectorAll(config.selector), function (el, i) {
        _splitMe(el);
      });
    }, 200);

    window.addEventListener('resize', _resize);

  };

  return {
    init: _init
  };

})();
