import { Box, BoxProps, Sans, SansSize } from "@artsy/palette"
import { DateTime } from "luxon"
import React from "react"

const daysSinceDate = (time: string | DateTime): number => {
  if (!time) {
    return null
  }
  const date = typeof time === "string" ? DateTime.fromISO(time) : time
  return Math.floor(Math.abs(date.diffNow("days").toObject().days))
}

export const fromToday = (time: string | DateTime) => {
  if (!time) {
    return false
  }
  const date = typeof time === "string" ? DateTime.fromISO(time) : time
  return daysSinceDate(date) === 0
}

const exactDate = (time: string) => {
  if (!time) {
    return null
  }
  const date = DateTime.fromISO(time)
  const daysSince = daysSinceDate(date)
  if (daysSince === 0) {
    return `Today ${date.toFormat("t")}`
  } else if (daysSince === 1) {
    return `Yesterday ${date.toFormat("t")}`
  } else if (daysSince < 7) {
    return date.toFormat("cccc t")
  } else {
    return date.toFormat("ccc, LLL d, t")
  }
}

const relativeDate = (time: string) => {
  if (!time) return null
  return DateTime.fromISO(time).toRelative()
}

interface TimeSinceProps extends Omit<BoxProps, "color"> {
  size?: SansSize
  time: string
  exact?: boolean
  style?: React.CSSProperties
}
export const TimeSince: React.FC<TimeSinceProps> = ({
  size = "2",
  time,
  exact,
  ...props
}) => {
  return (
    time && (
      <Box {...props}>
        <Sans size={size} color="black30">
          {exact ? exactDate(time) : relativeDate(time)}
        </Sans>
      </Box>
    )
  )
}
