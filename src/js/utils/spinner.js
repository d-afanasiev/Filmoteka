import { Block } from 'notiflix';

class Spinner {
  constructor({
    element = 'body',
    //element body string
    //Required, Select the element(s) to block. (ID or Class)

    message = '',
    //message    string
    //Message text in String format. Or, extend the initialize options with new options for each block element.

    querySelectorLimit = 200,
    // querySelectorLimit	200	number
    // Limit of the query selector NodeList length.

    className = 'notiflix-block',
    // className	notiflix-block	string
    // Changes the class name of the Block module elements.

    position = 'absolute',
    // position	absolute	string
    // Changes the position of the Block module elements.

    zindex = 1000,
    // zindex	1000	number
    // Changes the z-index.

    backgroundColor = 'rgba(255,255,255,0.9)',
    // backgroundColor	rgba(255,255,255,0.9)	string
    // Changes the background color. You can use HEX, RGB or RGBA.

    rtl = false,
    // rtl	false	boolean
    // Specifies the text direction to "right-to-left".

    useGoogleFont = false,
    // useGoogleFont	false	boolean
    // The "Quicksand" font-family can be used via Google Fonts. If you want to use it you can set this option as true

    fontFamily = 'Roboto',
    // fontFamily	Quicksand	string
    // Changes the font-family.

    cssAnimation = true,
    // cssAnimation	true	boolean
    // Notiflix uses CSS animations to show/hide the Block module elements. If you don't want to use CSS animations you can set this option to false

    cssAnimationDuration = 300,
    // cssAnimationDuration	300	number
    // Changes the CSS animations duration as milliseconds. Tip: 300 ms = 0.3 second.

    svgSize = '45px',
    // svgSize	45px	string
    // Changes the SVG Icons width and height. (Notiflix uses square scaled icons.)

    svgColor = '#ff6b08',
    // svgColor	#383838	string
    // Changes the SVG Icons color. You can use HEX, RGB or RGBA.

    messageFontSize = '13px',
    // messageFontSize	14px	string
    // Changes the font-size of the message text.

    messageMaxLength = 34,
    // messageMaxLength	34	number
    // Ignores characters of the message text after the specified number.

    messageColor = '#ff6b08',
    // messageColor	#383838	string
    // Changes the color of the message text.
  } = {}) {
    //
    this.element = element;
    this.message = message;
    this.init = {
      querySelectorLimit,
      className,
      position,
      zindex,
      backgroundColor,
      rtl,
      useGoogleFont,
      fontFamily,
      cssAnimation,
      cssAnimationDuration,
      svgSize,
      svgColor,
      messageFontSize,
      messageMaxLength,
      messageColor,
    };
  }
  show() {
    Block.dots(this.element, this.message, this.init);

    // console.log(this.element, 'spinner is showing');
  }
  hide() {
    Block.remove(this.element);
    // console.log('hide', this.element, 'spinner');
  }
}

export default Spinner;
