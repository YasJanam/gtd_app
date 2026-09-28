import { BellActive } from "flowbite-react-icons/outline";
import { Clock } from "flowbite-react-icons/outline";
import { PersonChalkboard } from "flowbite-react-icons/outline";
import { CalendarWeek } from "flowbite-react-icons/outline";
import { TruckClock } from "flowbite-react-icons/outline";
import { TrashBin } from "flowbite-react-icons/outline";




export const GtdStages = [
    {
        name:'actionable',
        text:'is it actionable',
        icon:<BellActive/>,
    },
    {
        name:'less than 2 minutes',
        text:'Does it take less than 2 minutes ?',
        icon:<Clock/>,
    },
    {
        name:'do by myself',
        text:'Do I have to do it myself?',
        icon:<PersonChalkboard/>,
    },
    {
        name:'calendar item',
        text:'Does it have a specific date ?',
        icon:<CalendarWeek/>,
    },
    {
        name:'someday/maybe',
        text:"Is it possible that someday I'll do it? ",
        icon:<TruckClock/>,
    },
    {
        name:'refrence / trash',
        text:"Does it matter ? ",
        icon:<TrashBin/>,
    },
]