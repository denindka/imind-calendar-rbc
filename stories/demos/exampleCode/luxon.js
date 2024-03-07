import React, { Fragment, useState, useEffect, useMemo } from 'react'
import { Calendar, luxonLocalizer, Views } from 'react-big-calendar'
import { DateTime, Settings } from 'luxon'
import DemoLink from '../../DemoLink.component'

import events from '../../resources/events'
import TimezoneSelect from '../TimezoneSelect'

const defaultTZ = DateTime.local().zoneName
const defaultDateStr = '2015-04-13'

function getDate(str, DateTimeObj) {
  return DateTimeObj.fromISO(str).toJSDate()
}

const event = {
  id: 13,
  title: 'Multi-day Event',
  start: new Date(2015, 3, 21, 8, 0, 0),
  end: new Date(2015, 3, 23, 9, 0, 0),
}

export default function Luxon() {
  const [timezone, setTimezone] = useState(defaultTZ)

  const { defaultDate, getNow, localizer, myEvents, scrollToTime } =
    useMemo(() => {
      Settings.defaultZone = 'UTC-12:00'
      return {
        defaultDate: getDate(defaultDateStr, DateTime),
        getNow: () => DateTime.local().toJSDate(),
        localizer: luxonLocalizer(DateTime, { firstDayOfWeek: 1 }),
        myEvents: [...events],
        scrollToTime: DateTime.local().toJSDate(),
      }
    }, [timezone])

  useEffect(() => {
    return () => {
      Settings.defaultZone = defaultTZ // reset to browser TZ on unmount
    }
  }, [])

  return (
    <Fragment>
      <DemoLink fileName="luxon">
        <TimezoneSelect
          defaultTZ={defaultTZ}
          setTimezone={setTimezone}
          timezone={timezone}
          title={`This calendar uses the 'luxonLocalizer'`}
        />
      </DemoLink>
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          events={myEvents}
          getNow={getNow}
          views={{
            day: true,
            week: true,
            work_week: true,
            month: true,
          }}
          localizer={localizer}
          scrollToTime={scrollToTime}
        />
      </div>
    </Fragment>
  )
}
