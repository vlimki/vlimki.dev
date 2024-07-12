import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex-svelte';
import rehypeExternalLinks from 'rehype-external-links';
import slug from 'remark-slug';
import rehypePostfixFootnoteAnchors from 'rehype-postfix-footnote-anchors';
import headings from 'rehype-autolink-headings';
import { createHighlighter } from "@bitmachina/highlighter";


const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],
  highlight: {
		highlighter: await createHighlighter({ theme: "css-variables" }),
	},
	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [remarkMath, slug],
	rehypePlugins: [rehypeKatex, rehypePostfixFootnoteAnchors, headings, [rehypeExternalLinks, {rel: ["noreferrer"], target: ['_blank']}]],
});

export default config;
