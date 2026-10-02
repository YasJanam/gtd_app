'use client'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

import { useState } from "react";
import { GtdStages } from "./gtdStages";
import GtdCommonModal from "./gtdModals/gtdCommonModal";


import { BellActive, CalendarPlus } from "flowbite-react-icons/outline";
import { Clock } from "flowbite-react-icons/outline";
import { PersonChalkboard } from "flowbite-react-icons/outline";
import { CalendarWeek } from "flowbite-react-icons/outline";
import { TruckClock } from "flowbite-react-icons/outline";
import { TrashBin } from "flowbite-react-icons/outline";
import { toast, Toaster } from "sonner";
import { Button, Datepicker, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

type Probs = {
    id:string,
    itemTitle?:string,
    itemDescription?:string,
}


const GtdProcess = ({id,itemTitle,itemDescription}:Probs) => {
    const router = useRouter();
    const token = getCookie('access_token');
    const [showActionable,setShowActionsble] = useState(true);
    const [showActionsCount,setShowActionsCount] = useState(false);
    const [showLessThan2Min,setShowLessThan2Min] = useState(false);
    const [showDoByMyself,setShowDoByMyself] = useState(false);
    const [showCalendarItem,setShowCalendarItem] = useState(false);
    const [showMaybe,setShowMaybe] = useState(false);
    const [showImportance,setShowImportance] = useState(false);

    const [showMessageModal,setShowMessageModal] = useState(false);
    const [messages,setMessage] = useState('');


    const [showcCalendarModal,setShowCalendarModal] = useState(false)
    const [date,setDate] = useState(new Date())


    const nowDoIt = () => {
        //toast.success('now do that!');
        setShowMessageModal(true);
        setMessage('Now do that !')
    }
    

    const changeStatus = async (status: string) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/inbox/items/${id}/change-status`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                toast.error(errorData.message || 'Failed to change item status');
                return;
            }

            

        } catch (error) {
            toast.error('Network error');
        } finally {
            router.back();
        }
    };

    
    const convertInboxItemToCalendarItem = async() => {
        try{
            await fetch(`${API_BASE_URL}/inbox/items/${id}`,{
                method:'PATCH',
                headers:{
                    Authorization: `Bearer ${token}` ,
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify({
                    status:'calendar_item',
                    dueDate: date
                })
            }).then(() => {router.back()})
        } catch {
            toast.error('error in item creation')
        }
    }


    const createWaitingFor = async() => {
        await changeStatus('waiting_for');
    }

    const createCalendarItem = async() => {
        setShowCalendarModal(true);
    }

    const createNextAction = async() => {
        await changeStatus('next_action');
    }

    const createSomedayItem = async() => {
        await changeStatus('someday');
    }

    const createReference = async() => {
        await changeStatus('reference');
    }

    const goToTrash = async() => {
        await changeStatus('trash');
    }
    

    const createProject = async() => {
        try{
             const response = await fetch(`${API_BASE_URL}/inbox/items/${id}/convert-to-project`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
           // console.error('Server error:', response.status, errorData);
            
            toast.error(errorData.message || 'error , new project');
            return;
        }

        const data = await response.json();
        console.log('Project created:', data);
        toast.success('inbox-item converted to project successfuly');
        router.back();

        } catch {
            toast.error('error in item creation')
        }
    }


    const nextModal = (
        close: React.Dispatch<React.SetStateAction<boolean>>,
        open: React.Dispatch<React.SetStateAction<boolean>>,
        delay = 300
        ) => {
        close(false);

        setTimeout(() => {
            open(true);
        }, delay);
        };



    return (<>

        

        <GtdCommonModal
        show={showActionable}
        onClose={() => setShowActionsble(false)}
        title="actionable"
        text="Is it actionable?"
        icon={<BellActive />}
        yesAction={() => {
            nextModal(
            setShowActionsble,
            setShowActionsCount
            );
        }}
        noAction={() => {
            nextModal(
            setShowActionsble,
            setShowMaybe
            );
        }}
        itemTitle={itemTitle}
        itemDescription={itemDescription}
        />


        <GtdCommonModal
        show={showActionsCount}
        onClose={() => setShowActionsCount(false)}
        title="action count"
        text="Does it have several actions?"
        icon={<BellActive />}
        yesAction={() => {
            setShowActionsCount(false);

            setTimeout(() => {
            createProject();
            }, 300);
        }}
        noAction={() => {
            nextModal(
            setShowActionsCount,
            setShowLessThan2Min
            );
        }}
        itemTitle={itemTitle}
        itemDescription={itemDescription}
        />


        <GtdCommonModal
        show={showLessThan2Min}
        onClose={() => setShowLessThan2Min(false)}
        title="less than 2 minutes"
        text="Does it take less than 2 minutes?"
        icon={<Clock />}
        yesAction={() => {
            setShowLessThan2Min(false);

            setTimeout(() => {
            nowDoIt();
            }, 300);
        }}
        noAction={() => {
            nextModal(
            setShowLessThan2Min,
            setShowDoByMyself
            );
        }}
        itemTitle={itemTitle}
        itemDescription={itemDescription}
        />


        <GtdCommonModal
        show={showDoByMyself}
        onClose={() => setShowDoByMyself(false)}
        title="do by myself"
        text="Do I have to do it myself?"
        icon={<PersonChalkboard />}
        yesAction={() => {
            nextModal(
            setShowDoByMyself,
            setShowCalendarItem
            );
        }}
        noAction={() => {
            setShowDoByMyself(false);

            setTimeout(() => {
            createWaitingFor();
            }, 300);
        }}
        itemTitle={itemTitle}
        itemDescription={itemDescription}
        />


        <GtdCommonModal
        show={showCalendarItem}
        onClose={() => setShowCalendarItem(false)}
        title="calendar item"
        text="Does it have a specific date?"
        icon={<CalendarWeek />}
        yesAction={() => {
            setShowCalendarItem(false);

            setTimeout(() => {
            createCalendarItem();
            }, 300);
        }}
        noAction={() => {
            setShowCalendarItem(false);

            setTimeout(() => {
            createNextAction();
            }, 300);
        }}
        itemTitle={itemTitle}
        itemDescription={itemDescription}
        />


        <GtdCommonModal
        show={showMaybe}
        onClose={() => setShowMaybe(false)}
        title="someday/maybe"
        text="Is it possible that someday I'll do it?"
        icon={<TruckClock />}
        yesAction={() => {
            setShowMaybe(false);

            setTimeout(() => {
            createSomedayItem();
            }, 300);
        }}
        noAction={() => {
            nextModal(
            setShowMaybe,
            setShowImportance
            );
        }}
        itemTitle={itemTitle}
        itemDescription={itemDescription}
        />


        <GtdCommonModal
        show={showImportance}
        onClose={() => setShowImportance(false)}
        title="reference / trash"
        text="Does it matter?"
        icon={<TrashBin />}
        yesAction={() => {
            setShowImportance(false);

            setTimeout(() => {
            createReference();
            }, 300);
        }}
        noAction={() => {
            setShowImportance(false);

            setTimeout(() => {
            goToTrash();
            }, 300);
        }}
        itemTitle={itemTitle}
        itemDescription={itemDescription}
        />

        
        <Modal show={showMessageModal} onClose={() => setShowMessageModal(false)} 
        dismissible
        >
            <ModalBody>
                <div className="flex items-center justify-between">
                    <p className="font-bold text-lg">{messages}</p>
                    <div><Button size="xs" onClick={() => {setShowMessageModal(false);setMessage('');router.back()}}>OK</Button></div>

                </div>
                
            </ModalBody>
        </Modal>




        {/* calendar modal */}
        <Modal
        show={showcCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        className="!items-center"
        >

        <ModalHeader>

            <div className="flex items-center gap-3">

            {/* Icon */}
            <div
                className="
                flex
                h-10 w-10
                shrink-0
                items-center justify-center
                rounded-xl
                bg-purple-100
                text-purple-600
                "
            >
                <CalendarWeek size={20} />
            </div>

            {/* Title */}
            <div>

                <p className="
                text-base
                font-bold
                text-gray-800
                ">
                Add to Calendar
                </p>

                <p className="
                mt-0.5
                text-xs
                font-normal
                text-gray-400
                ">
                Choose when you want to schedule this item.
                </p>

            </div>

            </div>

        </ModalHeader>


        <ModalBody className="overflow-visible">

            <div className="space-y-5 pt-2">

            {/* Date Section */}
            <div>

                <label
                className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                "
                >
                Select date
                </label>

                <div
                className="
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    p-2
                    transition
                    focus-within:border-purple-400
                    focus-within:bg-white
                    focus-within:ring-4
                    focus-within:ring-purple-100
                "
                >
                <Datepicker
                    key="open"
                    value={date}
                    onChange={(e) => setDate(e as any)}
                />
                </div>

            </div>


            {/* Footer */}
            <div
                className="
                flex
                justify-end
                gap-2
                border-t
                border-gray-100
                pt-4
                "
            >

                {/* Cancel */}
                <button
                onClick={() => setShowCalendarModal(false)}
                className="
                    rounded-xl
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-gray-500
                    transition
                    hover:bg-gray-100
                    hover:text-gray-700
                "
                >
                Cancel
                </button>


                {/* Add */}
                <Button
                onClick={convertInboxItemToCalendarItem}
                className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-purple-600
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-md
                    shadow-purple-200
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-purple-700
                    hover:shadow-lg
                "
                >
                <CalendarPlus size={16} />
                Add to Calendar
                </Button>

            </div>

            </div>

        </ModalBody>

        </Modal>


        <Toaster />

    </>)
}


export default GtdProcess;