module.exports = (content) => `
<html>
  <head>
    <meta charset="UTF-8" />
    <title>SQIP demo</title>
    <style type="text/css">
      body {
        font-family: sans-serif;
        background: black;
        padding: 2rem;
        color: white;
      }
      a {
        color: tomato;
      }
      a:visited {
        color: firebrick;
      }
      p:first-child {
        margin-top: 0;
      }
      img.preview {
        display: block;
        width: 100%;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
        table-layout: fixed;
        width: 100%;
      }
      td {
        position: relative;
        padding: 0;
      }
      td:hover .overlay {
        display: flex;
      }
      td,
      th {
        width: 240px;
      }
      th {
        text-align: left;
        padding: 1rem;
      }
      .description {
        padding: 1rem;
        font-size: 0.85em;
      }
      details {
        margin-top: 1rem;
      }
      .sizes {
        position: absolute;
        right: 0.5rem;
        bottom: 0.5rem;
      }
      .overlay {
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        padding: 1rem;
        color: white;
        flex-direction: column;
        justify-content: center;
      }
      .overlay table {
        font-size: 0.85em;
        table-layout: auto;
      }
      .overlay td,
      .overlay th {
        text-align: left;
        color: white;
        width: auto;
        padding: 0.25rem;
        vertical-align: top;
      }
      .preview-wrapper {
        position: relative;
        height: 0;
        overflow: hidden;
      }
      .preview-wrapper img {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .preview-wrapper-lqip::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        backdrop-filter: blur(20px);
        pointer-events: none;
      }
      .selected {
        background: green;
      }
      p.processing-time img {
        vertical-align: text-bottom;
      }
    </style>
  </head>
  <body>
    <h1>
      LQIP Comparison Demo${' '}

      <a href="https://github.com/transitive-bullshit/lqip-modern">
        <img src="./assets/github.svg" width="32" />
      </a>
    </h1>

    <p>
      LQIP (Low Quality Image Placeholders) generates efficient placeholder previews of images with the main goal of improving the perceived loading time of image heavy websites.
    </p>

    <p>
      This demo compares various LQIP techniques. It has been generated with a <a href="https://github.com/transitive-bullshit/sqip/tree/feature/lqip-modern/demo">fork</a> of <a href="https://github.com/axe312ger/sqip">sqip's excellent demo</a>.
    </p>

    <p>
      <a href="https://github.com/transitive-bullshit/lqip-modern">
        Learn more about this project.
      </a>
    </p>

    ${content}
  </body>
</html>
`
