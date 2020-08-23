const { resolve } = require('path')
const { tmpdir } = require('os')

const { readFile, writeFile, unlink } = require('fs-extra')
const dataURIToBuffer = require('data-uri-to-buffer')
const mozjpeg = require('mozjpeg')
const execa = require('execa')
const lqip = require('lqip')
const lqipModern = require('lqip-modern')
const sqip = require('sqip').default
// const sqipLegacy = require('sqip-legacy')
const htm = require('htm')
const vhtml = require('vhtml')
const sharp = require('sharp')

const html = htm.bind(vhtml)

const ROOT = resolve(__dirname, '..')
const ORIGINAL = resolve(__dirname, ROOT, 'public', 'original')
const PROCESSED = resolve(__dirname, ROOT, 'public', 'processed')
const DATASET = resolve(__dirname, ROOT, 'public', 'dataset.json')

async function writeImage({ dataURI, dist }) {
  const content = dataURIToBuffer(dataURI)
  await writeFile(dist, content)
}

const variants = [
  {
    name: 'thumbnail',
    title: 'Thumbnail',
    description: html`
      <p>
        300px thumbnail of the original image, minified with
        <a href="https://github.com/mozilla/mozjpeg">mozjpeg</a>
      </p>
    `,
    resultFileType: 'jpg',
    task: async ({ path, dist }) => {
      const rawThumbnail = await sharp(path).resize(300).jpeg().toBuffer()
      const tmpPath = resolve(
        tmpdir(),
        `sqip-demo-tmp-thumbnail-${Date.now()}.jpg`
      )
      await writeFile(tmpPath, rawThumbnail)
      await execa(mozjpeg, ['-outfile', dist, tmpPath])
      await unlink(tmpPath)
      const optimizedThumbnail = await readFile(dist)
      return optimizedThumbnail.toString()
    }
  },
  {
    name: 'lqip',
    title: 'LQIP',
    description: html`
      <p>
        Generated with <a href="https://github.com/zouhir/lqip-cli">lqip-cli</a>. This preview is blurred with a filter of 20px.
      </p>
    `,
    resultFileType: 'jpg',
    task: async ({ path, dist }) => {
      const result = await lqip.base64(path)
      await writeImage({ dataURI: result, dist })
      return result
    }
  },
  /*
  {
    name: 'lqip-custom',
    title: 'LQIP custom',
    description: html`
      <p>
        32px thumbnail generated with <a href="https://sharp.dimens.io/en/stable/">sharp</a>, minified with <a href="https://github.com/mozilla/mozjpeg">mozjpeg</a>. This preview is blurred with a filter of 20px.
      </p>
    `,
    resultFileType: 'jpg',
    task: async ({ path, dist }) => {
      const rawThumbnail = await sharp(path).resize(32).jpeg().toBuffer()
      const tmpPath = resolve(tmpdir(), `sqip-demo-tmp-lqip-${Date.now()}.jpg`)
      await writeFile(tmpPath, rawThumbnail)
      await execa(mozjpeg, ['-outfile', dist, tmpPath])
      await unlink(tmpPath)
      const optimizedThumbnail = await readFile(dist)
      return optimizedThumbnail.toString()
    }
  },
  */
  {
    name: 'lqip-modern-webp-8',
    title: 'LQIP modern webp @ 8px',
    description: html`
      <p>
        8px webp thumbnail generated with <a href="https://sharp.dimens.io/en/stable/">sharp</a> and an output quality of 20. This preview is blurred with a filter of 20px. (lqip-modern default settings)
      </p>
    `,
    resultFileType: 'webp',
    config: {
      outputFormat: 'webp',
      resize: 8
    },
    task: async ({ path, dist }) => {
      const result = await lqipModern(path, {
        outputFormat: 'webp',
        resize: 8
      })
      await writeImage({ dataURI: result.metadata.dataURIBase64, dist })
      return result.metadata.dataURIBase64
    }
  },
  {
    name: 'lqip-modern-jpeg-8',
    title: 'LQIP modern jpeg @ 8px',
    description: html`
      <p>
        8px jpeg thumbnail generated with <a href="https://sharp.dimens.io/en/stable/">sharp</a> and an output quality of 20. This preview is blurred with a filter of 20px.
      </p>
    `,
    config: {
      outputFormat: 'jpeg',
      resize: 8
    },
    resultFileType: 'jpg',
    task: async ({ path, dist }) => {
      const result = await lqipModern(path, {
        outputFormat: 'jpeg',
        resize: 8
      })
      await writeImage({ dataURI: result.metadata.dataURIBase64, dist })
      return result.metadata.dataURIBase64
    }
  },
  {
    name: 'lqip-modern-webp-16',
    title: 'LQIP modern webp @ 16px',
    description: html`
      <p>
        16px webp thumbnail generated with <a href="https://sharp.dimens.io/en/stable/">sharp</a> and an output quality of 20. This preview is blurred with a filter of 20px. (lqip-modern default settings)
      </p>
    `,
    resultFileType: 'webp',
    config: {
      outputFormat: 'webp',
      resize: 16
    },
    selected: true,
    task: async ({ path, dist }) => {
      const result = await lqipModern(path, {
        outputFormat: 'webp',
        resize: 16
      })
      await writeImage({ dataURI: result.metadata.dataURIBase64, dist })
      return result.metadata.dataURIBase64
    }
  },
  {
    name: 'lqip-modern-jpeg-16',
    title: 'LQIP modern jpeg @ 16px',
    description: html`
      <p>
        16px jpeg thumbnail generated with <a href="https://sharp.dimens.io/en/stable/">sharp</a> and an output quality of 20. This preview is blurred with a filter of 20px.
      </p>
    `,
    config: {
      outputFormat: 'jpeg',
      resize: 16
    },
    resultFileType: 'jpg',
    task: async ({ path, dist }) => {
      const result = await lqipModern(path, {
        outputFormat: 'jpeg',
        resize: 16
      })
      await writeImage({ dataURI: result.metadata.dataURIBase64, dist })
      return result.metadata.dataURIBase64
    }
  },
  {
    name: 'lqip-modern-webp-32',
    title: 'LQIP modern webp @ 32px',
    description: html`
      <p>
        32px webp thumbnail generated with <a href="https://sharp.dimens.io/en/stable/">sharp</a> and an output quality of 20. This preview is blurred with a filter of 20px.
      </p>
    `,
    resultFileType: 'webp',
    config: {
      outputFormat: 'webp',
      resize: 32
    },
    task: async ({ path, dist }) => {
      const result = await lqipModern(path, {
        outputFormat: 'webp',
        resize: 32
      })
      await writeImage({ dataURI: result.metadata.dataURIBase64, dist })
      return result.metadata.dataURIBase64
    }
  },
  {
    name: 'lqip-modern-jpeg-32',
    title: 'LQIP modern jpeg @ 32px',
    description: html`
      <p>
        32px jpeg thumbnail generated with <a href="https://sharp.dimens.io/en/stable/">sharp</a> and an output quality of 20. This preview is blurred with a filter of 20px.
      </p>
    `,
    config: {
      outputFormat: 'jpeg',
      resize: 32
    },
    resultFileType: 'jpg',
    task: async ({ path, dist }) => {
      const result = await lqipModern(path, {
        outputFormat: 'jpeg',
        resize: 32
      })
      await writeImage({ dataURI: result.metadata.dataURIBase64, dist })
      return result.metadata.dataURIBase64
    }
  },
  /*
  {
    name: 'sqip-legacy',
    title: 'SQIP v0.3.3',
    description: html`
      <p>The old version of SQIP. For comparision to v1.0.0</p>
    `,
    config: { filename: 'path/to/file.jpg' },
    resultFileType: 'svg',
    task: async ({ path, dist }) => {
      const { svg_base64encoded } = sqipLegacy({ filename: path })
      const dataURI = `data:image/svg;base64,${svg_base64encoded}`
      await writeImage({ dataURI, dist })
      return dataURI
    }
  },
  */
  {
    name: 'sqip',
    title: 'SQIP default',
    description: html` <p>Just the default settings</p> `,
    config: { input: 'path/to/file.jpg' },
    resultFileType: 'svg',
    task: async ({ path, dist }) => {
      const {
        metadata: { dataURI }
      } = await sqip({
        input: path
      })
      await writeImage({ dataURI, dist })
      return dataURI
    }
  },
  /*
  {
    name: 'sqip-pixels',
    title: 'SQIP pixels',
    description: html`
      <p>
        Pixel art via${' '}
        <a
          href="https://github.com/axe312ger/sqip/tree/master/packages/sqip-plugin-pixels#readme"
          >sqip-plugin-pixels</a
        >
      </p>
    `,
    config: {
      input: 'path/to/file.jpg',
      plugins: ['pixels', 'svgo', 'data-uri']
    },
    resultFileType: 'svg',
    task: async ({ path, dist }) => {
      const {
        metadata: { dataURI }
      } = await sqip({
        input: path,
        plugins: ['pixels', 'svgo', 'data-uri']
      })
      await writeImage({ dataURI, dist })
      return dataURI
    }
  },
  {
    name: 'sqip-art',
    title: 'SQIP primitive art',
    description: html`
      <p>
        Primitive art with 100 triangles. More options:${' '}
        <a
          href="https://github.com/axe312ger/sqip/tree/master/packages/sqip-plugin-primitive#readme"
          >sqip-plugin-primitive</a
        >
      </p>
    `,
    config: {
      input: 'path/to/file.jpg',
      plugins: [
        { name: 'primitive', options: { numberOfPrimitives: 50, mode: 1 } },
        'svgo',
        'data-uri'
      ]
    },
    resultFileType: 'svg',
    task: async ({ path, dist }) => {
      const {
        metadata: { dataURI }
      } = await sqip({
        input: path,
        plugins: [
          { name: 'primitive', options: { numberOfPrimitives: 50, mode: 1 } },
          'svgo',
          'data-uri'
        ]
      })
      await writeImage({ dataURI, dist })
      return dataURI
    }
  },
  */
  {
    name: 'sqip-potrace',
    title: 'SQIP potrace',
    description: html`
      <p>
        Default settings of
        <a
          href="https://github.com/axe312ger/sqip/tree/master/packages/sqip-plugin-potrace#readme"
          >sqip-plugin-potrace</a
        >
      </p>
    `,
    config: {
      input: 'path/to/file.jpg',
      plugins: ['potrace', 'svgo', 'data-uri']
    },
    resultFileType: 'svg',
    task: async ({ path, dist }) => {
      const {
        metadata: { dataURI }
      } = await sqip({
        input: path,
        plugins: ['potrace', 'svgo', 'data-uri']
      })
      await writeImage({ dataURI, dist })
      return dataURI
    }
  },
  /*
  {
    name: 'sqip-potrace-posterize',
    title: 'SQIP potrace posterize',
    description: html`
      <p>
        Use of potrace's posterize feature
        <a
          href="https://github.com/axe312ger/sqip/tree/master/packages/sqip-plugin-potrace#readme"
          >sqip-plugin-potrace</a
        >
      </p>
    `,
    config: {
      input: 'path/to/file.jpg',
      plugins: [
        { name: 'potrace', options: { posterize: true } },
        'svgo',
        'data-uri'
      ]
    },
    resultFileType: 'svg',
    task: async ({ path, dist }) => {
      const {
        metadata: { dataURI }
      } = await sqip({
        input: path,
        plugins: [
          { name: 'potrace', options: { posterize: true } },
          'svgo',
          'data-uri'
        ]
      })
      await writeImage({ dataURI, dist })
      return dataURI
    }
  }
  */
]

module.exports = {
  ROOT,
  ORIGINAL,
  PROCESSED,
  DATASET,
  variants,
  html
}
