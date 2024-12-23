import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from "react-share";

interface ShareProps {
  'data-url': string
}

export default function ShareSocial(props: ShareProps) {
  const url = props['data-url']
  return (
    <p>
      <FacebookShareButton url={url} className="mr-1">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LinkedinShareButton url={url} className="mr-1">
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <TelegramShareButton url={url} className="mr-1">
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <TwitterShareButton url={url} className="mr-1">
        <XIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={url} className="mr-1">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </p>
  )
}

