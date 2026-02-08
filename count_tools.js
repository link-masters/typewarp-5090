const { categories } = require("./src/lib/categories");

const totalTools = categories.reduce((acc, cat) => acc + cat.tools.length, 0);
console.log(`Total tools count: ${totalTools}`);

const allTools = categories.flatMap((c) => c.tools);
console.log(`Unique slugs: ${new Set(allTools.map((t) => t.slug)).size}`);
