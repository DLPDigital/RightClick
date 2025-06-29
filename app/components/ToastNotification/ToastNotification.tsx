import { useState } from "react"
import * as Toast from "@radix-ui/react-toast"

import { container, toastViewport, toastTitle } from "./ToastNotification.css"

type Props = {
  toastId: string
  message: string
  onRemove: (toastId: string) => void
}

export const ToastNotification: React.FC<Props> = ({ toastId, message, onRemove }) => {
  const [open, setOpen] = useState(true)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      onRemove(toastId)
    }
  }

  return (
    <>
      <Toast.Root className={container} open={open} onOpenChange={handleOpenChange} duration={5000}>
        <Toast.Description className={toastTitle}>{message}</Toast.Description>
      </Toast.Root>

      <Toast.Viewport className={toastViewport} />
    </>
  )
}
