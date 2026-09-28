
'use client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


import { Modal, ModalHeader,ModalBody,ModalFooter, Button } from "flowbite-react";
import { getCookie } from "cookies-next";
import React, { useState } from "react";


type Probs = {
    show:boolean
    onClose:() => void
    text:string
    title?:string
    icon:React.ReactElement
    yesAction:(e:any) => void
    noAction:(e:any) => void
    itemTitle?:string
    itemDescription?:string
}


const GtdCommonModal = ({show,onClose,text,title,icon,yesAction,noAction,itemTitle,itemDescription}:Probs) => {
    const token = getCookie('access_token');
    const [aiAnswer,setAiAnswer] = useState({
        answer:'',
        reason:'',
    });
    const [showAiAnswer,setShowAiAnswer] = useState(false);
    const [aiAnswerLoading,setAiAnswerLoading] = useState(false);

        const answerQuestionByAi = async () => {
        try {
            setAiAnswerLoading(true);
            const response = await fetch('/api/ai/answer-gtd-question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: itemTitle,
                description:itemDescription,
                question: text,
                }),
            });

            if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'خطا در تولید');
            }

            const data = await response.json();
            console.log(data.actions); 
            setAiAnswer({answer:data.answer,reason:data.reason});
            setShowAiAnswer(true);
            //alert(data.reason)

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setAiAnswerLoading(false);
        }
    };

    return (<>
    <Modal
        show={show}
        onClose={onClose}
        className="!items-center animate-fadeIn"
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
            {icon}
            </div>


            {/* Title + Item */}
            <div className="min-w-0">

            {/* Modal title */}
            <p className="
                text-base
                font-bold
                text-gray-800
            ">
                {title}
            </p>


            {/* Project / Item title */}
            {itemTitle && (
                <p className="
                mt-1
                truncate
                text-sm
                font-semibold
                text-purple-600
                ">
                {itemTitle}
                </p>
            )}


            {/* Description */}
            <p className="
                mt-0.5
                text-xs
                font-normal
                text-gray-400
            ">
                Please review your choice before continuing.
            </p>

            </div>

        </div>

        </ModalHeader>


        <ModalBody>

            <div className="space-y-5 pt-2">

            {/* Question */}
                    
                <div
                className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    border border-purple-200
                    bg-gradient-to-br
                    from-purple-50
                    via-white
                    to-fuchsia-50
                    p-5
                    shadow-sm
                "
                >

                {/* Decorative glow */}
                <div
                    className="
                    pointer-events-none
                    absolute
                    -right-8
                    -top-8
                    h-24
                    w-24
                    rounded-full
                    bg-purple-200/40
                    blur-2xl
                    "
                />

                <div className="relative flex gap-4">

                    {/* Question Icon */}
                    <div
                    className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-purple-600
                        text-xl
                        font-bold
                        text-white
                        shadow-md
                        shadow-purple-200
                    "
                    >
                    ?
                    </div>


                    <div className="min-w-0">

                    {/* Attention label */}
                    <p
                        className="
                        mb-1
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-purple-500
                        "
                    >
                        Confirmation required
                    </p>


                    {/* Main question */}
                    <p
                        className="
                        text-lg
                        font-bold
                        leading-7
                        text-gray-800
                        "
                    >
                        {text}
                    </p>


                    {/* Small hint */}
                    <p
                        className="
                        mt-2
                        text-xs
                        leading-5
                        text-gray-400
                        "
                    >
                        Please make sure you want to continue with this action.
                    </p>

                    </div>

                </div>

                </div>


            {/* AI Answer */}
            {showAiAnswer && (

                <div
                className="
                    overflow-hidden
                    rounded-2xl
                    border border-fuchsia-100
                    bg-white
                    shadow-sm
                "
                >

                {/* AI Header */}
                <div
                    className="
                    flex
                    items-center
                    gap-2
                    border-b border-fuchsia-100
                    bg-gradient-to-r
                    from-purple-50
                    to-fuchsia-50
                    px-4 py-3
                    "
                >

                    <div
                    className="
                        flex
                        h-7 w-7
                        items-center justify-center
                        rounded-lg
                        bg-gradient-to-r
                        from-purple-600
                        to-fuchsia-500
                        text-sm
                        text-white
                    "
                    >
                    ✦
                    </div>

                    <span className="
                    text-sm
                    font-bold
                    text-purple-700
                    ">
                    AI Answer
                    </span>

                </div>


                {/* Answer */}
                <div className="space-y-3 p-4">

                    <p className="
                    text-sm
                    leading-6
                    text-gray-700
                    ">
                    {aiAnswer.answer?'yes':'no'}
                    </p>


                    {aiAnswer.reason && (

                    <div className="
                        border-l-2
                        border-purple-300
                        pl-3
                    ">

                        <p className="
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-wide
                        text-purple-400
                        ">
                        Reason
                        </p>

                        <p className="
                        mt-1
                        text-xs
                        leading-5
                        text-gray-500
                        ">
                        {aiAnswer.reason}
                        </p>

                    </div>

                    )}

                </div>

                </div>

            )}

            </div>

        </ModalBody>


        <ModalFooter>

            <div
            className="
                flex
                w-full
                flex-col-reverse
                justify-end
                gap-2
                border-t border-gray-100
                pt-4
                sm:flex-row
            "
            >

            {/* No */}
            <Button
                onClick={noAction}
                color="alternative"
                className="
                rounded-xl
                border border-gray-200
                bg-white
                px-5 py-2.5
                text-sm
                font-semibold
                text-gray-600
                transition
                hover:bg-gray-50
                hover:text-gray-800
                "
            >
                No
            </Button>


            {/* AI */}
            <Button
                onClick={answerQuestionByAi}
                className="
                relative
                overflow-hidden
                rounded-xl
                border border-fuchsia-200
                bg-gradient-to-r
                from-purple-600
                to-fuchsia-500
                px-5 py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-[0_6px_20px_rgba(168,85,247,0.3)]
                "
                disabled={aiAnswerLoading}
            >
                
                {aiAnswerLoading?'processing ...':'✦ Ask AI'}

            </Button>


            {/* Yes */}
            <Button
                onClick={yesAction}
                className="
                rounded-xl
                bg-purple-600
                px-5 py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-purple-700
                hover:shadow-md
                "
            >
                Yes
            </Button>

            </div>

        </ModalFooter>

        </Modal>
    </>)
}

export default GtdCommonModal;