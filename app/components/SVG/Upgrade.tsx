import type { SVGProps } from "react"
import React from "react"
import { vars } from "../../theme/theme.css"

export const Upgrade: React.FC<SVGProps<SVGSVGElement>> = ({
  fill = vars.color.background,
  width = 24,
  height = 24,
  ...props
}) => {
  const widthNum = Number(width)
  const heightNum = Number(height)
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <metadata>Icon by Created by Miftakhudin from The Noun Project</metadata>
      <path
        fill={fill}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0525 9.21953C15.7538 9.21953 18.7651 12.2308 18.7651 15.9321C18.7651 17.479 18.2382 18.905 17.356 20.0421C16.9482 18.1212 15.5335 16.5911 13.697 16.0099C14.4207 15.4942 14.8942 14.6495 14.8942 13.6952C14.8942 12.1286 13.6192 10.8536 12.0526 10.8536C10.486 10.8536 9.21097 12.1286 9.21097 13.6952C9.21097 14.6496 9.68442 15.4942 10.4082 16.0099C8.57161 16.5911 7.15688 18.1211 6.74912 20.0421C5.86599 18.9049 5.34006 17.4789 5.34006 15.9321C5.34006 12.2308 8.35124 9.21953 12.0525 9.21953ZM15.1209 9.09766V6.36118H17.1787C17.5293 6.36118 17.7019 5.92992 17.4469 5.68805L12.3207 0.82709C12.1707 0.68459 11.9344 0.68459 11.7844 0.82709L6.65732 5.68805C6.40232 5.92992 6.57482 6.36118 6.92545 6.36118H8.98326V9.09766C6.37806 10.2723 4.56006 12.8935 4.56006 15.9321C4.56006 20.0628 7.92102 23.4237 12.0526 23.4237C16.1842 23.4237 19.5452 20.0628 19.5452 15.9321C19.5452 12.8937 17.7263 10.2725 15.1209 9.09766Z"
        transform={`scale(${widthNum / 24}, ${heightNum / 24})`}
      ></path>
    </svg>
  )
}
