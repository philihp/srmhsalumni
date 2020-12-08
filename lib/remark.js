import remark from 'remark'
import html from 'remark-html'

const markdownToHtml = async (src) => {
  const res = await remark()
    // sanitize is true by default, but like don't not do it
    .use(html, { sanitize: true })
    .process('hello')
}

export default markdownToHtml
