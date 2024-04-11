import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a moment",
    m: "a minute",
    mm: "%d minute",
    h: "an hour",
    hh: "%d hour",
    d: "a day",
    dd: "%d روز",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
})

const getCurrentDate = (published: Date) => dayjs(published).fromNow()

export { getCurrentDate }
