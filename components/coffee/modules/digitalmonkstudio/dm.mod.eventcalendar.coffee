angular.module 'dm.EventCalendar', []

Weekdays = [
    "Sunday"
    "Monday"
    "Tuesday"
    "Wednesday"
    "Thursday"
    "Friday"
    "Saturday"
]

Months = [ 
    "January"
    "February"
    "March"
    "April"
    "May"
    "June"
    "July"
    "August"
    "September"
    "October"
    "November"
    "December"
]

### Number of days in each month ###
Mdays = [
    31
    28
    31
    30
    31
    30
    31
    31
    30
    31
    30
    31
]

Today = new Date()
Date = Today.getDate()
Month = Today.getMonth()
dow = Today.getDay()
Year = Today.getYear()

day = 1

### account for leap year ###
if ((Year % 400 is 0) or (Year %4 is 0) and (Year % 100 isnt 0))
    Mdays[1] = 0

Mfirst  = Today
Mfirst.setDate(1)

### current date ###
# console.log Weekdays[dow] + ", " + Months[Month] + " " + Date +  ", " + Year


CalendarFactory = (args) ->
    cf  = {}
    cf.Months = Months
    cf.Weekdays = Weekdays

    ### returns month, day, year object ###
    cf.getDate = ->
        oDate = {}
        oDate.month = Months[Month]
        oDate.day = Weekdays[dow]
        oDate.year = Today.getYear()
        return oDate

    return cf

angular.module('dm.EventCalendar')
    .factory('CalendarFactory', CalendarFactory)




