import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex-svelte';
import rehypeExternalLinks from 'rehype-external-links';
import slug from 'remark-slug';
import rehypePostfixFootnoteAnchors from 'rehype-postfix-footnote-anchors';
import headings from 'rehype-autolink-headings';
import { createHighlighter } from "@bitmachina/highlighter";
import { visit } from 'unist-util-visit';

const fixTask = (task) => {
	let item = task.substring(5, task.length)
	let id = task.replace(" ", "");
	return task.startsWith("- [x") ? `- [x] <input id="${id}" type="checkbox" checked="true" disabled> <label for="${id}">${item}</label>` : `- [ ] <input id="${id}" type="checkbox" disabled> <label for="${id}">${item}</label>`
}

function rehypeFixCheckboxes() {
  return function transformer(tree) {
    visit(tree, 'element', (node, idx, parent) => {
			console.log(node)
			let newNode = structuredClone(node);
			if(node.tagName === "input" && node.properties.type==="checkbox") {
				newNode.properties = {added: true, ...newNode.properties}
				node.tagName = "label";
				node.properties = {"for": "task123"}
				parent.children.splice(idx, 0, newNode);
			}
    });
  };
}

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],
  highlight: {
		highlighter: await createHighlighter({ theme: "css-variables" }),
	},
	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [remarkMath, slug],
	rehypePlugins: [rehypeKatex, rehypeFixCheckboxes, rehypePostfixFootnoteAnchors, headings, [rehypeExternalLinks, {rel: ["noreferrer"], target: ['_blank']}]],
});

export default config;
