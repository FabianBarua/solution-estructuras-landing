import { column, defineDb, defineTable } from "astro:db"

// https://astro.build/db/config

const Categories = defineTable({
	columns: {
		id: column.number({ primaryKey: true, optional: false, unique: true }),
		name: column.text({ optional: false }),
	},
})

const Products = defineTable({
	columns: {
		id: column.number({ primaryKey: true, optional: false, unique: true }),
		sku: column.text({ optional: true }),
		name: column.text({ optional: false }),
		shortName: column.text({ optional: true }),
		status: column.text({ optional: false }),
		price: column.number({ optional: false }),
		description: column.text({ optional: true }),
		imageUrl: column.text({ optional: true }),
		imageUrl2: column.text({ optional: true }),
		imageUrl3: column.text({ optional: true }),
		imageAlt: column.text({ optional: true }),
		categoryId: column.number({ optional: true, references: () => Categories.columns.id }),
		showAtHome: column.boolean({ optional: true, default: false }),
	},
})

const SocialMedia = defineTable({
	columns: {
		id: column.number({ primaryKey: true, optional: false, unique: true }),
		name: column.text({ optional: false }),
		url: column.text({ optional: false }),
		icon: column.text({ optional: false }),
		actived: column.boolean({ optional: false, default: true }),
	},
})

const User = defineTable({
	columns: {
		id: column.text({ primaryKey: true, optional: false, unique: true }),
		username: column.text({ unique: true, optional: false }),
		password: column.text({ optional: true }),
		github_id: column.text({ optional: true, unique: true }),
	},
})

const Session = defineTable({
	columns: {
		id: column.text({ optional: false, unique: true }),
		userId: column.text({ optional: false, references: () => User.columns.id }),
		expiresAt: column.number({ optional: false }),
	},
})

export default defineDb({
	tables: {
		User,
		Session,
		Products,
		Categories,
		SocialMedia,
	},
})
