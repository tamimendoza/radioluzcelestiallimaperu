import { turso } from "@src/turso";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const { rows } = await turso.execute("SELECT src FROM imagen ORDER BY id")
    return new Response(JSON.stringify(rows))
  } catch (error) {
    return new Response('Error al ejecutar la consulta', { status: 500 })
  }
}
