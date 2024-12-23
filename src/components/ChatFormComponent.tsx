import { useCallback, useRef, type SyntheticEvent } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function ChatFormComponent() {
  const inputMensaje = useRef<HTMLTextAreaElement>(null)
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async (evt: SyntheticEvent) => {
    evt.preventDefault();

    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha('newChat');
    // Do whatever you want with the token
    const target = evt.target as typeof evt.target & {
      nombre: { value: string };
      mensaje: { value: string };
    };
    if (target.nombre.value.trim() == '' || target.mensaje.value == '') {
      return;
    }

    await guardar(target.nombre.value, target.mensaje.value, token);

    target.mensaje.value = "";
    inputMensaje.current?.focus();
  }, [executeRecaptcha]);

  const guardar = async (nombre: string, mensaje: string, token: string) => {
    const response = await fetch("api/chat.guardar.json", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre,
        mensaje,
        token
      })
    })
    if (response.ok) {
      await response.json()
    }
  }

  return (
    <div className="mt-4 rounded-lg border-solid border-2 mx-4">
      <h2 className="mt-4 text-xl font-bold text-center">CHAT</h2>
      <form onSubmit={handleReCaptchaVerify}>
        <div className="mx-4">
          <label className="block text-base font-medium text-gray-700">Nombre</label>
          <input type="text" name="nombre" className="h-10 my-2 block w-full rounded-md border-solid border-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder:italic placeholder:text-slate-400" placeholder="Ingrese nombre" />
        </div>
        <div className="mx-4">
          <label className="block text-base font-medium text-gray-700">Mensaje</label>
          <textarea name="mensaje" ref={inputMensaje} className="h-20 my-2 block w-full rounded-md border-solid border-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder:italic placeholder:text-slate-400" placeholder="Ingrese mensaje" />
        </div>
        <div className="mx-4 mb-4">
          <button type="submit" className="w-full bg-blue-500 text-white rounded-md mt-2 py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Enviar mensaje
          </button>
        </div>
      </form>
    </div>
  )
}

