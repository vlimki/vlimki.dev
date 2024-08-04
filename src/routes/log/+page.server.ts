import type { PageServerLoad } from './$types';
import { slugFromPath } from '$lib/slugFromPath';
import { compile } from 'mdsvex';
import opts from '../../../mdsvex.config.js';

export const load: PageServerLoad = async ({ url }) => {
	const modules = import.meta.glob(`/src/posts/**/*.{md,svx,svelte.md}`);
	const response = await fetch('https://vlimki.dev/upload/tasks/tasks');
  const text = await response.text();
	const tasks = parseTasks(text);
	let textFixed = text;

	for(let t of tasks) {
		textFixed = textFixed.replace(t, fixTask(t));
	}

	const postPromises = Object.entries(modules).map(([path, resolver]) =>
		resolver().then(
			(post) =>
				({
					slug: slugFromPath(path),
					...(post as unknown as App.MdsvexFile).metadata
				} as App.Post)
		)
	);

	const posts = await Promise.all(postPromises);
	let publishedPosts = posts.filter((post) => post.published && post.tags.includes("log"));

	publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
	let tag = url.searchParams.get("tag");

	return { posts: publishedPosts, tasks: await compile(textFixed, opts) };
};

const parseTasks = (md: string): string[] => {
	return md.split("\n").filter(x => x.startsWith("- ["));
}

const fixTask = (task: string): string => {
	let item = task.substring(5, task.length)
	let id = task.replace(" ", "");
	return task.startsWith("- [x") ? `- [x] <input id="${id}" type="checkbox" checked="true" disabled> <label for="${id}">${item}</label>` : `- [ ] <input id="${id}" type="checkbox" disabled> <label for="${id}">${item}</label>`
}
