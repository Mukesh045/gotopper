
export const notes = {
  html: {
    "HTML HOME": [{
      content: [
        "HTML is the standard markup language for Web pages.",
        "With HTML you can create your own Website.",
        "HTML is easy to learn - You will enjoy it!"
      ]
    }],
    "HTML Introduction": [{
      content: [
        "HTML is the standard markup language for creating Web pages.",
        "## What is HTML?",
        "HTML stands for Hyper Text Markup Language.",
        "HTML is the standard markup language for creating Web pages.",
        "HTML describes the structure of a Web page.",
        "HTML consists of a series of elements.",
        "HTML elements tell the browser how to display the content."
      ],
      exampleCode: `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>`
    }],
    "HTML Editors": [{
      content: [
        "A simple text editor is all you need to learn HTML.",
        "## Learn HTML Using Notepad or TextEdit",
        "Web pages can be created and modified by using professional HTML editors.",
        "However, for learning HTML we recommend a simple text editor like Notepad (PC) or TextEdit (Mac).",
        "We believe in that using a simple text editor is a good way to learn HTML.",
        "Follow the steps below to create your first web page with Notepad or TextEdit."
      ]
    }],
    "HTML Basic": [{
      content: [
        "In this chapter, we will show some basic HTML examples.",
        "Don't worry if we use tags you have not learned about yet."
      ],
      exampleCode: `<!DOCTYPE html>
<html>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`
    }],
    "HTML Elements": [{
      content: [
        "An HTML element is defined by a start tag, some content, and an end tag.",
        "The HTML element is everything from the start tag to the end tag:",
        "<tagname>Content goes here...</tagname>",
        "Examples of some HTML elements:",
        "<h1>My First Heading</h1>",
        "<p>My first paragraph.</p>"
      ]
    }],
    "HTML Attributes": [{
      content: [
        "Attributes provide additional information about HTML elements.",
        "## The href Attribute",
        "The <a> tag defines a hyperlink. The href attribute specifies the URL of the page the link goes to."
      ],
      exampleCode: `<a href="https://www.w3schools.com">Visit W3Schools</a>`
    }],
    "HTML Headings": [{
      content: [
        "HTML headings are titles or subtitles that you want to display on a webpage.",
        "HTML headings are defined with the <h1> to <h6> tags.",
        "<h1> defines the most important heading. <h6> defines the least important heading."
      ],
      exampleCode: `<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>`
    }],
    "HTML Paragraphs": [{
      content: [
        "The HTML <p> element defines a paragraph.",
        "A paragraph always starts on a new line, and browsers automatically add some white space (a margin) before and after a paragraph."
      ],
      exampleCode: `<p>This is a paragraph.</p>
<p>This is another paragraph.</p>`
    }],
    "HTML Styles": [{
      content: [
        "The HTML style attribute is used to add styles to an element, such as color, font, size, and more."
      ],
      exampleCode: `<p style="color:red;">This is a red paragraph.</p>`
    }],
    "HTML Formatting": [{
      content: [
        "HTML contains several elements for defining text with a special meaning.",
        "<b> - Bold text",
        "<strong> - Important text",
        "<i> - Italic text",
        "<em> - Emphasized text"
      ],
      exampleCode: `<b>This text is bold</b>
<strong>This text is important!</strong>
<i>This text is italic</i>
<em>This text is emphasized</em>`
    }],
    "HTML Quotations": [{
      content: [
        "The HTML <blockquote> element defines a section that is quoted from another source."
      ],
      exampleCode: `<p>Here is a quote from WWF's website:</p>
<blockquote cite="http://www.worldwildlife.org/who/index.html">
For 60 years, WWF has worked to help people and nature thrive. As the world's leading conservation organization, WWF works in nearly 100 countries. At every level, we collaborate with people around the world to develop and deliver innovative solutions that protect communities, wildlife, and the places in which they live.
</blockquote>`
    }],
    "HTML Comments": [{
      content: [
        "HTML comments are not displayed in the browser, but they can help document your HTML source code.",
        "You can add comments to your HTML source by using the following syntax:"
      ],
      exampleCode: `<!-- Write your comments here -->`
    }],
    "HTML Colors": [{
      content: [
        "HTML colors are specified with predefined color names, or with RGB, HEX, HSL, RGBA, or HSLA values."
      ],
      exampleCode: `<h1 style="background-color:DodgerBlue;">Hello World</h1>
<p style="background-color:Tomato;">Lorem ipsum...</p>`
    }],
    "HTML CSS": [{
      content: [
        "Cascading Style Sheets (CSS) is used to format the layout of a webpage.",
        "With CSS, you can control the color, font, the size of text, the spacing between elements, how elements are positioned and laid out, what background images or background colors are to be used, different displays for different devices and screen sizes, and much more!"
      ]
    }],
    "HTML Links": [{
      content: [
        "The HTML <a> tag defines a hyperlink.",
        "The most important attribute of the <a> element is the href attribute, which indicates the link's destination."
      ],
      exampleCode: `<a href="https://www.w3schools.com/">Visit W3Schools.com!</a>`
    }],
    "HTML Images": [{
      content: [
        "The HTML <img> tag is used to embed an image in a web page.",
        "The <img> tag is empty, it contains attributes only, and does not have a closing tag.",
        "The src attribute specifies the URL (web address) of the image.",
        "The alt attribute provides an alternate text for an image, if the user for some reason cannot view it."
      ],
      exampleCode: `<img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">`
    }],
    "HTML Favicon": [{
      content: [
        "A favicon is a small image displayed next to the page title in the browser tab.",
        "To add a favicon to your website, either save your favicon image to the root directory of your webserver, or create a folder in the root directory called images, and save your favicon image in this folder."
      ],
      exampleCode: `<head>
  <title>My Page Title</title>
  <link rel="icon" type="image/x-icon" href="/images/favicon.ico">
</head>`
    }],
    "HTML Page Title": [{
      content: [
        "The <title> element defines the title of the document. The title must be text-only, and it is shown in the browser's title bar or in the page's tab."
      ],
      exampleCode: `<!DOCTYPE html>
<html>
<head>
  <title>HTML Tutorial</title>
</head>
<body>

The content of the document......

</body>
</html>`
    }],
    "HTML Tables": [{
      content: [
        "HTML tables allow web developers to arrange data into rows and columns.",
        "Each table cell is defined by a <td> and a </td> tag.",
        "Each table row starts with a <tr> and ends with a </tr> tag."
      ],
      exampleCode: `<table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
</table>`
    }],
    "HTML Lists": [{
      content: [
        "An unordered list starts with the <ul> tag. Each list item starts with the <li> tag.",
        "An ordered list starts with the <ol> tag. Each list item starts with the <li> tag."
      ],
      exampleCode: `<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>`
    }],
    "HTML Block & Inline": [{
      content: [
        "Every HTML element has a default display value, depending on what type of element it is.",
        "A block-level element always starts on a new line and takes up the full width available.",
        "An inline element does not start on a new line and it only takes up as much width as necessary."
      ]
    }],
    "HTML Forms": [{
      content: [
        "The HTML <form> element is used to create an HTML form for user input.",
        "The <form> element is a container for different types of input elements, such as: text fields, checkboxes, radio buttons, submit buttons, etc."
      ],
      exampleCode: `<form action="/action_page.php">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="John"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname" value="Doe"><br><br>
  <input type="submit" value="Submit">
</form>`
    }],
    "HTML Graphics": [{
      content: [
        "The HTML <canvas> element is used to draw graphics, on the fly, via JavaScript.",
        "The <canvas> element is only a container for graphics. You must use JavaScript to actually draw the graphics."
      ],
      exampleCode: `<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>`
    }],
    "HTML Media": [{
      content: [
        "The HTML <video> element is used to show a video on a web page.",
        "The HTML <audio> element is used to play an audio file on a web page."
      ],
      exampleCode: `<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>`
    }],
    "HTML APIs": [{
      content: [
        "## The Geolocation API",
        "The Geolocation API is used to get the geographical position of a user.",
        "## The Drag/Drop API",
        "Drag and drop is a very common feature. It is when you \"grab\" an object and drag it to a different location.",
        "## The Web Storage API",
        "The Web Storage API is a simple syntax for storing and retrieving data in the browser."
      ]
    }],
    "HTML Form Elements": [{
      content: [
        "HTML form elements are used to collect user input.",
        "Common elements include input, textarea, select, button."
      ],
      exampleCode: `<form>
  <input type="text" name="name" placeholder="Name">
  <textarea name="message" placeholder="Message"></textarea>
  <select name="option">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>
  <button type="submit">Submit</button>
</form>`
    }],
    "HTML Canvas": [{
      content: [
        "The HTML <canvas> element is used to draw graphics via JavaScript."
      ],
      exampleCode: `<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000;"></canvas>
<script>
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.fillStyle = "red";
  ctx.fillRect(10, 10, 50, 50);
</script>`
    }],
    "HTML Accessibility": [{
      content: [
        "HTML accessibility ensures content is usable by people with disabilities.",
        "Use semantic elements, alt text, ARIA attributes."
      ],
      exampleCode: `<img src="image.jpg" alt="Description of image">
<button aria-label="Close">X</button>
<nav role="navigation">
  <ul>
    <li><a href="#home">Home</a></li>
  </ul>
</nav>`
    }],
    "HTML Web Components": [{
      content: [
        "Web Components allow creating reusable custom elements."
      ],
      exampleCode: `<template id="my-template">
  <style>
    p { color: red; }
  </style>
  <p>My Web Component</p>
</template>
<my-component></my-component>
<script>
  class MyComponent extends HTMLElement {
    connectedCallback() {
      const template = document.getElementById('my-template');
      const clone = document.importNode(template.content, true);
      this.appendChild(clone);
    }
  }
  customElements.define('my-component', MyComponent);
</script>`
    }]
  },
  css: {
    "CSS HOME": [
      "Welcome to the CSS tutorial.",
      "CSS is used to style HTML elements.",
      "Learn how to make your web pages look great with CSS.",
    ],
    "CSS Introduction": [
      "CSS stands for Cascading Style Sheets.",
      "It describes how HTML elements are to be displayed on screen.",
      "CSS saves a lot of work as it can control the layout of multiple web pages all at once.",
    ],
    "CSS Syntax": [
      "A CSS rule consists of a selector and a declaration block.",
      "The selector points to the HTML element you want to style.",
      "The declaration block contains one or more declarations separated by semicolons.",
    ],
    "CSS Selectors": [
      "CSS selectors are used to select the HTML elements you want to style.",
      "Basic selectors include element, id, and class selectors.",
      "Advanced selectors include attribute, pseudo-class, and pseudo-element selectors.",
    ],
    "CSS How To": [
      "CSS can be added to HTML documents in three ways: inline, internal, and external.",
    ],
    "CSS Comments": ["CSS comments are not displayed in the browser."],
    "CSS Errors": [
      "Common CSS errors include missing semicolons, incorrect property names, and invalid values.",
    ],
    "CSS Colors": [
      "CSS colors can be specified by name, RGB value, or hex value.",
      "Color names include red, blue, green, etc.",
      "Hex values are in the format #RRGGBB.",
    ],
    "CSS Background": [
      "The background property is used to set the background color of an element.",
      "You can also set background images, position, and size.",
      "Backgrounds can be styled with gradients and multiple layers.",
    ],
    "CSS Borders": [
      "Borders can be set around HTML elements.",
      "Properties include border-width, border-style, and border-color.",
      "You can set borders on all sides or individually.",
    ],
    "CSS Margins": [
      "Margins are used to create space around elements.",
      "Margins are transparent and do not have a background color.",
      "Margin properties can be set for top, right, bottom, and left.",
    ],
    "CSS Padding": [
      "Padding is used to create space inside elements.",
      "Padding is the space between the content and the border.",
      "Padding properties can be set for all sides or individually.",
    ],
    "CSS Height/Width": [
      "The height and width properties are used to set the height and width of an element.",
      "Values can be in pixels, percentages, or other units.",
      "The box-sizing property affects how height and width are calculated.",
    ],
    "CSS Box Sizing": [
      "The box-sizing property defines how the width and height of an element are calculated.",
      "Values include content-box and border-box.",
      "Using border-box makes it easier to manage element sizes.",
    ],
    "CSS Box Model": [
      "The CSS box model is a box that wraps around every HTML element.",
      "It consists of margins, borders, padding, and the actual content.",
      "Understanding the box model is essential for layout and spacing.",
    ],
    "CSS Outline": [
      "An outline is a line drawn outside the element's border.",
      "Outlines do not take up space and do not affect the element's position.",
      "Outline properties include width, style, and color.",
    ],
    "CSS Text": [
      "CSS text properties allow you to control the appearance of text.",
      "Properties include color, alignment, decoration, and transformation.",
      "Font properties control the typeface, size, and weight.",
    ],
    "CSS Fonts": [
      "Font properties control the appearance of text.",
      "Properties include family, size, style, and weight.",
      "Web fonts can be loaded using @font-face.",
    ],
    "CSS Icons": [
      "Icons can be added using icon fonts or SVG.",
      "Popular icon libraries include Font Awesome and Material Icons.",
      "Icons are styled using CSS like any other text.",
    ],
    "CSS Links": [
      "Links can be styled using pseudo-classes like :link, :visited, :hover, :active.",
      "You can change color, decoration, and other properties.",
      "Links should have clear visual feedback for user interaction.",
    ],
    "CSS Lists": [
      "List properties control the appearance of lists.",
      "You can change the list style type, position, and image.",
      "Custom bullets can be created using background images.",
    ],
    "CSS Tables": [
      "Table properties control the layout and appearance of tables.",
      "Properties include border-collapse, border-spacing, and caption-side.",
      "Table cells can be styled individually.",
    ],
    "CSS Display": [
      "The display property specifies how an element is displayed.",
      "Common values include block, inline, inline-block, and none.",
      "Flexbox and grid use display: flex and display: grid.",
    ],
    "CSS Position": [
      "The position property specifies the type of positioning method used for an element.",
      "Values include static, relative, absolute, fixed, and sticky.",
      "Positioned elements can use top, right, bottom, and left properties.",
    ],
    "CSS Max-Width/Max-Height": [
      "The max-width and max-height properties limit the width and height of an element.",
      "They prevent elements from becoming too large.",
      "Values can be in pixels, percentages, or other units.",
    ],
    "CSS Z-Index": [
      "The z-index property specifies the stack order of elements.",
      "Elements with a higher z-index are in front of those with a lower z-index.",
      "Z-index only works on positioned elements (position: relative, absolute, fixed, or sticky).",
    ],
    "CSS Overflow": [
      "The overflow property controls what happens if content overflows an element's box.",
      "Values include visible, hidden, scroll, and auto.",
      "Overflow can be set for x and y axes separately.",
    ],
    "CSS Float": [
      "The float property is used for positioning and formatting content.",
      "Elements can float left or right.",
      "Floats are often used for layouts but can be tricky.",
    ],
    "CSS Inline-block": [
      "Inline-block elements are like inline elements but can have width and height.",
      "They flow with the text but respect box model properties.",
      "Useful for creating horizontal layouts.",
    ],
    "CSS Align": [
      "Alignment properties include text-align and vertical-align.",
      "Text-align works on block elements, vertical-align on inline elements.",
      "Flexbox provides more powerful alignment options.",
    ],
    "CSS Combinators": [
      "Combinators allow you to combine selectors.",
      "Types include descendant, child, adjacent sibling, and general sibling.",
      "They help target elements based on their relationships.",
    ],
    "CSS Pseudo-class": [
      "Pseudo-classes define a special state of an element.",
      "Examples include :hover, :focus, :nth-child.",
      "They allow styling based on user interaction or position.",
    ],
    "CSS Pseudo-element": [
      "Pseudo-elements create abstractions about the document tree.",
      "Examples include ::before, ::after, ::first-line.",
      "They allow adding content or styling parts of elements.",
    ],
    "CSS Opacity": [
      "The opacity property sets the opacity level for an element.",
      "Values range from 0 (transparent) to 1 (opaque).",
      "Opacity affects the entire element including its contents.",
    ],
    "CSS Navigation Bar": [
      "Navigation bars are created using lists styled with CSS.",
      "They often use flexbox or floats for layout.",
      "Hover effects and active states improve usability.",
    ],
    "CSS Dropdowns": [
      "Dropdown menus are created using nested lists.",
      "They use position: absolute for the dropdown content.",
      "JavaScript is often used to show/hide the dropdown.",
    ],
    "CSS Image Gallery": [
      "Image galleries display multiple images in a grid.",
      "They use flexbox or grid for layout.",
      "Lightbox effects can be added for enlarged views.",
    ],
    "CSS Image Sprites": [
      "Image sprites combine multiple images into one.",
      "They reduce HTTP requests and improve load times.",
      "Background-position is used to show the correct part of the sprite.",
    ],
    "CSS Attr Selectors": [
      "Attribute selectors select elements based on their attributes.",
      'Examples include [type="text"], [href^="https"].',
      "They allow styling based on attribute values.",
    ],
    "CSS Forms": [
      "Form elements can be styled with CSS.",
      "Properties include border, padding, and background.",
      "Pseudo-classes like :focus improve user experience.",
    ],
    "CSS Counters": [
      "CSS counters allow automatic numbering of elements.",
      "They use counter-reset and counter-increment.",
      "Useful for lists, headings, and outlines.",
    ],
    "CSS Units": [
      "CSS units specify length, size, and position.",
      "Absolute units include px, pt; relative include em, rem, %.",
      "Choosing the right unit is important for responsive design.",
    ],
    "CSS Specificity": [
      "Specificity determines which CSS rule is applied when multiple rules match the same element.",
      "It is calculated based on the types of selectors used.",
      "Inline styles have the highest specificity.",
    ],
    "CSS Importance": [
      "The !important declaration overrides any other declarations.",
      "Use it sparingly as it makes debugging more difficult.",
      "It should be used only when absolutely necessary.",
    ],
    "CSS Math Functions": [
      "CSS math functions perform calculations to determine CSS property values.",
      "Examples include calc(), min(), max(), clamp().",
      "They allow dynamic sizing and responsive design.",
    ],
    "CSS Optimization": [
      "Optimizing CSS improves page load times and performance.",
      "Techniques include minification, combining files, and removing unused styles.",
      "Use tools like PurgeCSS and CSSNano for optimization.",
    ],
    "CSS Accessibility": [
      "Accessible CSS ensures that web content is usable by all people, including those with disabilities.",
      "Use sufficient color contrast, focus styles, and avoid content that flashes.",
      "Test with screen readers and keyboard navigation.",
    ],
    "CSS Responsive Design": [
      "Responsive design makes web pages look good on all devices.",
      "Use flexible grids, images, and media queries.",
      "Test on different screen sizes and orientations.",
    ],
    "CSS Website Layout": [
      "Website layouts use CSS to arrange content.",
      "Techniques include floats, flexbox, and grid.",
      "Responsive design adapts to different screen sizes.",
    ],
    "CSS Flexbox": [
      "Flexbox is a layout model for arranging items in a container.",
      "It provides control over direction, alignment, and space.",
      "Flexbox is great for one-dimensional layouts.",
    ],
    "CSS Grid": [
      "CSS Grid is a layout system for two-dimensional layouts.",
      "It uses rows and columns to position items.",
      "Grid is powerful for complex layouts.",
    ],
  },
  js: {
    "JS HOME": [
      "Welcome to the JavaScript tutorial.",
      "JavaScript is the programming language of the web.",
      "Learn how to add interactivity to your web pages.",
    ],
    "JS Introduction": [
      "JavaScript is a scripting language for web pages.",
      "It can update and change both HTML and CSS.",
      "JavaScript can calculate, manipulate, and validate data.",
    ],
    "JS Where To": [
      "JavaScript can be placed in <script> tags in HTML.",
      "It can be internal or external.",
      "External scripts are cached and can improve page load.",
    ],
    "JS Output": [
      "JavaScript can display data in different ways.",
      "Methods include innerHTML, document.write, alert, console.log.",
      "Choose the appropriate method based on the context.",
    ],
    "JS Statements": [
      "JavaScript statements are executed line by line.",
      "Statements can be grouped in code blocks.",
      "Semicolons are optional but recommended.",
    ],
    "JS Syntax": [
      "JavaScript syntax is similar to other programming languages.",
      "It includes variables, operators, functions, and control structures.",
      "Case sensitivity and whitespace rules apply.",
    ],
    "JS Comments": [
      "Comments are used to explain code.",
      "Single-line comments use //, multi-line use /* */.",
      "Comments are ignored by the browser.",
    ],
    "JS Variables": [
      "Variables store data values.",
      "They are declared with var, let, or const.",
      "Choose the appropriate keyword based on scope and mutability.",
    ],
    "JS Data Types": [
      "JavaScript has dynamic typing.",
      "Primitive types include string, number, boolean, undefined, null.",
      "Objects are complex data types.",
    ],
    "JS Letters": [
      "JavaScript variable names can include letters, digits, underscores, and dollar signs.",
      "They must begin with a letter, underscore, or dollar sign.",
      "JavaScript is case-sensitive.",
    ],
    "JS Constants": [
      "Constants are declared with const.",
      "Their values cannot be reassigned.",
      "Use constants for values that should not change.",
    ],

    "JS Operators": [
      "Operators perform operations on variables and values.",
      "Types include arithmetic, assignment, comparison, and logical.",
      "Understanding operator precedence is important.",
    ],
    "JS Arithmetic": [
      "Arithmetic operators perform mathematical operations.",
      "Common operators include +, -, *, /, %.",
      "JavaScript follows standard mathematical rules.",
    ],
    "JS Assignment": [
      "Assignment operators assign values to variables.",
      "The basic operator is =.",
      "Compound operators include +=, -=, *=, /=.",
    ],
    "JS Comparison": [
      "Comparison operators compare two values.",
      "They return true or false.",
      "Types include ==, ===, !=, !==, <, >, <=, >=.",
    ],
    "JS If Else": [
      "If-else statements execute code based on conditions.",
      "They can be nested or chained with else if.",
      "Ternary operator provides shorthand.",
    ],
    "JS Switch": [
      "Switch statements select one of many code blocks.",
      "They use case labels for different values.",
      "Default case handles unmatched values.",
    ],
    "JS Loops": [
      "Loops execute code repeatedly.",
      "Types include for, while, do-while.",
      "Break and continue control loop execution.",
    ],
    "JS Break": [
      "Break statement exits a loop or switch.",
      "It stops execution and continues after the loop.",
      "Useful for terminating loops early.",
    ],
    "JS Continue": [
      "Continue statement skips the current iteration of a loop.",
      "It moves to the next iteration.",
      "Useful for skipping specific conditions.",
    ],
    "JS Functions": [
      "Functions are blocks of code designed to perform a task.",
      "They can take parameters and return values.",
      "Functions can be defined or expressed.",
    ],
    "JS Objects": [
      "Objects are collections of properties.",
      "Properties can be values or functions.",
      "Objects can be created with object literals or constructors.",
    ],
    "JS Events": [
      "Events are actions that happen in the browser.",
      "JavaScript can respond to events with event handlers.",
      "Common events include click, load, and submit.",
    ],
    "JS Strings": [
      "Strings are sequences of characters.",
      "They can be created with single or double quotes.",
      "Strings have methods for manipulation.",
    ],
    "JS String Templates": [
      "Template literals allow embedded expressions.",
      "They use backticks (`) and ${} for variables.",
      "They support multi-line strings.",
    ],
    "JS Numbers": [
      "Numbers can be integers or floating-point.",
      "JavaScript uses 64-bit floating-point representation.",
      "Special values include Infinity and NaN.",
    ],
    "JS Number Methods": [
      "Number methods work on numbers.",
      "Examples include toString, toFixed, parseInt.",
      "Methods can convert or format numbers.",
    ],
    "JS Arrays": [
      "Arrays store multiple values in a single variable.",
      "They can hold different data types.",
      "Arrays have methods for adding, removing, and iterating.",
    ],
    "JS Array Methods": [
      "Array methods manipulate arrays.",
      "Examples include push, pop, shift, unshift, splice.",
      "Methods like map, filter, reduce are powerful for data processing.",
    ],
    "JS Math": [
      "The Math object provides mathematical constants and functions.",
      "Methods include round, random, max, min.",
      "Math.PI and Math.E are common constants.",
    ],
    "JS Date": [
      "The Date object works with dates and times.",
      "It can create, parse, and format dates.",
      "Methods include getFullYear, getMonth, getDate.",
    ],
    "JS Booleans": [
      "Booleans represent true or false values.",
      "They result from comparisons and logical operations.",
      "All values have a boolean equivalent.",
    ],
    "JS Advanced Concepts": [
      "Advanced JavaScript concepts include closures, prototypes, and async programming.",
      "Understanding the event loop and promises is crucial for modern JS.",
      "Explore design patterns and best practices for maintainable code.",
    ],
    "JS Comparisons": [
      "Comparison operators compare values.",
      "They return true or false.",
      "Types include ==, ===, !=, !==, <, >, <=, >=.",
    ],

    "JS Type Conversion": [
      "JavaScript can convert between types.",
      "Implicit conversion happens automatically.",
      "Explicit conversion uses functions like String(), Number().",
    ],
    "JS Errors": [
      "Errors occur when code has problems.",
      "Try-catch blocks handle errors.",
      "Throw statement creates custom errors.",
    ],
    "JS Debugging": [
      "Debugging finds and fixes errors.",
      "Console.log helps inspect values.",
      "Browser dev tools provide debugging features.",
    ],
    "JS Scope": [
      "Scope determines variable accessibility.",
      "Variables have global or local scope.",
      "Block scope applies to let and const.",
    ],
    "JS Let": [
      "Let declares block-scoped variables.",
      "Variables are not hoisted.",
      "Preferred over var for modern code.",
    ],
    "JS Const": [
      "Const declares constants.",
      "Values cannot be reassigned.",
      "Objects and arrays can still be mutated.",
    ],
    "JS Class": [
      "Classes are templates for objects.",
      "They use constructor and methods.",
      "Classes support inheritance.",
    ],
    "JS Modules": [
      "Modules allow code organization.",
      "Export and import statements share code.",
      "Modules promote reusability.",
    ],
    "JS Sets": [
      "Sets store unique values.",
      "They have methods for adding and checking.",
      "Useful for eliminating duplicates.",
    ],
    "JS Maps": [
      "Maps store key-value pairs.",
      "Keys can be any type.",
      "Methods include set, get, has.",
    ],
    "JS WeakSet": [
      "WeakSet stores weakly held objects.",
      "Objects can be garbage collected.",
      "Limited to objects only.",
    ],
    "JS WeakMap": [
      "WeakMap stores weakly held key-value pairs.",
      "Keys must be objects.",
      "Allows garbage collection of keys.",
    ],
    "JS JSON": [
      "JSON is a data format.",
      "JavaScript has methods to parse and stringify JSON.",
      "Used for data exchange.",
    ],
    "JS Promise": [
      "Promises handle asynchronous operations.",
      "They have pending, fulfilled, and rejected states.",
      "Then and catch methods handle results.",
    ],
    "JS Async": [
      "Async functions simplify asynchronous code.",
      "They return promises.",
      "Use await to pause execution.",
    ],
    "JS Await": [
      "Await pauses async function execution.",
      "It waits for a promise to resolve.",
      "Must be used inside async functions.",
    ],
  },
  java: {
    "Java HOME": [
      "Welcome to the Java tutorial.",
      "Java is a popular programming language.",
      "Learn object-oriented programming with Java.",
    ],
    "Java Introduction": [
      "Java is a high-level, class-based, object-oriented language.",
      "It is designed to have as few implementation dependencies as possible.",
      "Java is used for building applications, web services, and more.",
    ],
    "Java Syntax": [
      "Java syntax is similar to C++.",
      "Programs start with a class and main method.",
      "Statements end with semicolons.",
    ],
    "Java Variables": [
      "Variables store data values.",
      "They have types like int, String, boolean.",
      "Variables must be declared before use.",
    ],
    "Java Data Types": [
      "Java has primitive and reference types.",
      "Primitives include int, double, char, boolean.",
      "Reference types include classes and arrays.",
    ],
    "Java Operators": [
      "Operators perform operations on variables.",
      "Types include arithmetic, relational, logical.",
      "Operator precedence follows standard rules.",
    ],
    "Java Control Statements": [
      "Control statements direct program flow.",
      "Include if-else, switch, loops.",
      "Break and continue modify loop behavior.",
    ],
    "Java Arrays": [
      "Arrays store multiple values of the same type.",
      "They have fixed size.",
      "Accessed with index starting from 0.",
    ],
    "Java Methods": [
      "Methods are blocks of code that perform tasks.",
      "They can take parameters and return values.",
      "Defined within classes.",
    ],
    "Java Classes": [
      "Classes are blueprints for objects.",
      "They contain fields and methods.",
      "Objects are instances of classes.",
    ],
    "Java Objects": [
      "Objects are instances of classes.",
      "They have state and behavior.",
      "Created using the new keyword.",
    ],
    "Java Inheritance": [
      "Inheritance allows classes to inherit from others.",
      "Uses the extends keyword.",
      "Promotes code reuse.",
    ],
    "Java Polymorphism": [
      "Polymorphism allows methods to do different things.",
      "Achieved through method overriding.",
      "Enables dynamic method dispatch.",
    ],
    "Java Abstraction": [
      "Abstraction hides complex implementation.",
      "Uses abstract classes and interfaces.",
      "Focuses on essential features.",
    ],
    "Java Encapsulation": [
      "Encapsulation bundles data and methods.",
      "Uses access modifiers.",
      "Protects data integrity.",
    ],
    "Java Interfaces": [
      "Interfaces define contracts for classes.",
      "Contain abstract methods.",
      "Support multiple inheritance.",
    ],
    "Java Packages": [
      "Packages organize classes.",
      "Prevent naming conflicts.",
      "Use import statements.",
    ],
    "Java Exception Handling": [
      "Exceptions handle runtime errors.",
      "Use try-catch blocks.",
      "Throw custom exceptions.",
    ],
    "Java File I/O": [
      "File I/O reads and writes files.",
      "Uses streams and readers.",
      "Handle with try-with-resources.",
    ],
    "Java Threads": [
      "Threads allow concurrent execution.",
      "Implement Runnable or extend Thread.",
      "Use synchronization for safety.",
    ],
    "Java Collections": [
      "Collections store groups of objects.",
      "Include List, Set, Map.",
      "Provide algorithms for manipulation.",
    ],
    "Java Generics": [
      "Generics enable type-safe collections.",
      "Use angle brackets <>.",
      "Prevent ClassCastException.",
    ],
    "Java Lambda Expressions": [
      "Lambdas provide functional programming.",
      "Simplify anonymous classes.",
      "Used with functional interfaces.",
    ],
    "Java Stream API": [
      "Streams process collections declaratively.",
      "Support map, filter, reduce.",
      "Enable parallel processing.",
    ],
  },
  python: {
    "Python HOME": [
      "Welcome to the Python tutorial.",
      "Python is a versatile programming language.",
      "Learn programming with Python.",
    ],
    "Python Introduction": [
      "Python is an interpreted, high-level language.",
      "It emphasizes code readability.",
      "Used for web development, data science, AI.",
    ],
    "Python Syntax": [
      "Python uses indentation for blocks.",
      "No semicolons needed.",
      "Comments use #.",
    ],
    "Python Variables": [
      "Variables store values.",
      "No type declaration needed.",
      "Dynamic typing.",
    ],
    "Python Data Types": [
      "Types include int, float, str, list, dict.",
      "Mutable and immutable types.",
      "Type checking with isinstance.",
    ],
    "Python Operators": [
      "Arithmetic, comparison, logical operators.",
      "Assignment operators.",
      "Membership and identity operators.",
    ],
    "Python Control Flow": [
      "If-else for conditions.",
      "For and while loops.",
      "Break, continue, pass.",
    ],
    "Python Functions": [
      "Defined with def keyword.",
      "Can return values.",
      "Support parameters and arguments.",
    ],
    "Python Modules": [
      "Modules organize code.",
      "Import with import statement.",
      "Standard library modules available.",
    ],
    "Python File Handling": [
      "Open files with open().",
      "Read and write operations.",
      "Use with statement for safety.",
    ],
    "Python Exceptions": [
      "Handle errors with try-except.",
      "Raise custom exceptions.",
      "Finally block for cleanup.",
    ],
    "Python Classes": [
      "Define classes with class keyword.",
      "Support inheritance.",
      "Methods and attributes.",
    ],
    "Python Objects": [
      "Instances of classes.",
      "Have attributes and methods.",
      "Created with class name().",
    ],
    "Python Inheritance": [
      "Classes can inherit from others.",
      "Use super() for parent methods.",
      "Multiple inheritance supported.",
    ],
    "Python Polymorphism": [
      "Methods can behave differently.",
      "Duck typing.",
      "Operator overloading.",
    ],
    "Python Decorators": [
      "Modify function behavior.",
      "Use @ syntax.",
      "Common for logging, caching.",
    ],
    "Python Generators": [
      "Generate values on the fly.",
      "Use yield keyword.",
      "Memory efficient for large data.",
    ],
    "Python Lambda": [
      "Anonymous functions.",
      "Single expression.",
      "Used with map, filter.",
    ],
    "Python List Comprehension": [
      "Create lists concisely.",
      "Syntax: [expr for item in iterable].",
      "Can include conditions.",
    ],
    "Python Dictionary Comprehension": [
      "Create dicts concisely.",
      "Syntax: {key: value for item in iterable}.",
      "Similar to list comprehension.",
    ],
    "Python Sets": [
      "Unordered unique elements.",
      "Operations like union, intersection.",
      "Mutable and immutable sets.",
    ],
    "Python Tuples": [
      "Immutable sequences.",
      "Used for fixed data.",
      "Can be used as dict keys.",
    ],
  },
};
