import { turso } from "@src/turso";
import type { APIRoute } from "astro";
import crypto from "node:crypto";

const PUSHER_APP_ID = import.meta.env.PUSHER_APP_ID
const PUSHER_KEY = import.meta.env.PUBLIC_PUSHER_KEY
const PUSHER_SECRET = import.meta.env.PUSHER_SECRET
const PUSHER_CLUSTER = import.meta.env.PUBLIC_PUSHER_CLUSTER

export const POST: APIRoute = async ({ request }) => {
  //FIXME: Recaptcha

  if (request.headers.get("Content-Type") != "application/json") {
    return new Response(null, { status: 400 })
  }

  const body = await request.json();
  const nombre = body.nombre;
  const mensaje = body.mensaje;

  if (!nombre || !mensaje ||
    (nombre == null || nombre == undefined || nombre.trim().length == 0) ||
    (mensaje == null || mensaje == undefined || mensaje.trim().length == 0)
  ) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }

  try {
    await turso.execute({ sql: "INSERT INTO chat(nombre, mensaje) VALUES (?, ?)", args: [nombre, mensaje] })
  } catch (error) {
    console.log(error)
  }

  try {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const timestampLimit = 600;
    const randomTimestamp = Math.floor(Math.random() * timestampLimit);
    const auth_timestamp = currentTimestamp - randomTimestamp;

    const body = '{"name":"new-mensaje","channels":["youtube"],"data":"{\\"message\\":\\"Hola\\"}"}';
    const auth_version = '1.0';

    const body_md5 = crypto.createHash("md5").update(body).digest("hex");

    const string_to_sign =
      "POST\n/apps/" + PUSHER_APP_ID +
      "/events\nauth_key=" + PUSHER_KEY +
      "&auth_timestamp=" + auth_timestamp +
      "&auth_version=" + auth_version +
      "&body_md5=" + body_md5;

    const auth_signature = crypto.createHmac("sha256", PUSHER_SECRET).update(string_to_sign).digest("hex");

    const apiURL = "http://api-" + PUSHER_CLUSTER + ".pusher.com/apps/" + PUSHER_APP_ID +
      '/events?auth_key=' + PUSHER_KEY +
      '&auth_timestamp=' + auth_timestamp +
      '&auth_version=' + auth_version +
      '&body_md5=' + body_md5 +
      '&auth_signature=' + auth_signature;

    const responseP = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    });
    await responseP.text();
  } catch (error) {
    console.log(error);
  }

  return new Response(
    JSON.stringify({
      message: "Success!"
    }),
    { status: 200 }
  );
};
