import { db, eq, Products } from 'astro:db'

export const GET = async (req) => {
  const productos = await db.select().from(Products).where(eq(Products.showAtHome, true))
  return new Response(JSON.stringify(productos))
}
