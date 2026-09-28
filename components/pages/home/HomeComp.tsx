
import HomeItemCard from "./homeItemCard";
import { Inbox } from "flowbite-react-icons/outline";
import { Play } from "flowbite-react-icons/outline";
import { Hourglass } from "flowbite-react-icons/outline";
import { QuestionCircle } from "flowbite-react-icons/outline";
import { Folder } from "flowbite-react-icons/outline";
import { Check } from "flowbite-react-icons/outline";


const HomeComponent = () => {
    return (<>
        
        <div className="px-3 py-5">

        {/* Header */}
        <div className="mb-8">

            <p className="
            mb-1
            text-sm
            font-medium
            text-purple-500
            ">
            GTD • Dashboard
            </p>

            <h1 className="
            text-3xl
            md:text-4xl
            font-bold
            tracking-tight
            text-gray-100
            ">
            Your Workspace
            </h1>

            <p className="
            mt-2
            text-sm
            text-gray-500
            ">
            Everything you need to stay organized and focused.
            </p>

        </div>


        {/* Dashboard Cards */}
        <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-5
        ">

            <HomeItemCard
            icon={
                <div className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-purple-100
                text-purple-600
                ">
                <Inbox size={25} />
                </div>
            }
            name="Inbox"
            count={50}
            />


            <HomeItemCard
            icon={
                <div className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-blue-100
                text-blue-600
                ">
                <Play size={25} />
                </div>
            }
            name="Next Actions"
            count={50}
            />


            <HomeItemCard
            icon={
                <div className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-orange-100
                text-orange-500
                ">
                <Hourglass size={25} />
                </div>
            }
            name="Waiting For"
            count={50}
            />


            <HomeItemCard
            icon={
                <div className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-red-100
                text-red-500
                ">
                <QuestionCircle size={25} />
                </div>
            }
            name="Someday"
            count={50}
            />


            <HomeItemCard
            icon={
                <div className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-yellow-100
                text-yellow-600
                ">
                <Folder size={25} />
                </div>
            }
            name="Projects"
            count={50}
            />


            <HomeItemCard
            icon={
                <div className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-green-100
                text-green-600
                ">
                <Check size={25} />
                </div>
            }
            name="Done Today"
            count={50}
            />

        </div>

        </div>


    </>)
}


export default HomeComponent;