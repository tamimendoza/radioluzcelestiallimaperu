import type Mensaje from "@src/interfaces/Mensaje"
import { useEffect, useRef, useState } from "react"
import pusherJs, { Channel } from 'pusher-js'

const PUSHER_APP_KEY = import.meta.env.PUBLIC_PUSHER_KEY
const PUSHER_CLUSTER = import.meta.env.PUBLIC_PUSHER_CLUSTER

export default function ChatListComponent() {
  const [mensajes, setMensajes] = useState([])
  const divChat = useRef<HTMLDivElement>(null)
  const pusher = useRef<pusherJs | null>(null)
  const channel = useRef<Channel | null>(null)

  useEffect(() => {
    getMensajes()
    pusher.current = new pusherJs(PUSHER_APP_KEY, {
      cluster: PUSHER_CLUSTER
    })
    channel.current = pusher.current.subscribe('youtube')
    const handle = (_data: any) => {
      getMensajes()
    }
    channel.current.bind('new-mensaje', handle)

    return () => {
      if (channel.current) {
        channel.current.unbind()
        pusher.current?.unsubscribe('youtube')
      }
      pusher.current?.disconnect()
    }
  }, [])

  const getMensajes = async () => {
    const response = await fetch("api/chat.obtener.json")
    const data = await response.json()
    if (data) setMensajes(data)
    resetScroll()
  }

  const resetScroll = () => {
    if (divChat.current) {
      divChat.current.scrollTo(0, 0)
    }
  }

  return (
    <div className="mt-4 rounded-lg border-solid border-2 mx-4 h-full">
      <h2 className="mt-4 text-xl font-bold text-center">Listado de chats</h2>
      <div className="mx-4 grid grid-cols-1 h-full">
        <div ref={divChat} className="overflow-y-scroll lg:h-96 h-80 border-solid border border-gray-300">
          <ul className="list-none space-y-5 divide-y divide-gray-300">
            {mensajes.map((mensaje: Mensaje, index: number) => (
              <li key={index} className="border-solid px-2">
                <small className="font-bold">{mensaje.nombre}: </small>
                <small>{mensaje.mensaje}</small>
                <small className="text-gray-500 float-right">{mensaje.fecha.toString()}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

