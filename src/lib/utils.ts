export const formatDate = (d: Date): string => {
  let str = d.toDateString();
  let [_, mon, day, yr] = str.split(" ");
  let dayFormatted = parseInt(day).toString();

  return `${mon} ${dayFormatted}, ${yr}`
}

export const fixCheckboxes = (text: string) => {
	const tasks = parseTasks(text);
	let textFixed = text;

	for(let t of tasks) {
		textFixed = textFixed.replace(t, fixTask(t));
	}

	return textFixed;
}

const parseTasks = (md: string): string[] => {
	return md.split("\n").filter(x => x.startsWith("- ["));
}

export const fixTask = (task: string): string => {
	let item = task.substring(5, task.length)
	let id = task.replace(" ", "");
	return task.startsWith("- [x") ? `- [x] <input id="${id}" type="checkbox" checked="true" disabled> <label for="${id}">${item}</label>` : `- [ ] <input id="${id}" type="checkbox" disabled> <label for="${id}">${item}</label>`
}
