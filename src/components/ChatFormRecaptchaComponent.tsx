import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ChatFormComponent from "@src/components/ChatFormComponent";

const GOOGLE_RECAPTCHA_KEY = import.meta.env.PUBLIC_GOOGLE_RECAPTCHA_KEY;

export default function ChatFormRecaptchaComponent() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={GOOGLE_RECAPTCHA_KEY}>
      <ChatFormComponent />
    </GoogleReCaptchaProvider>
  )
}

