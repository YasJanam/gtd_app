
import AiResponse from "@/components/commonComponents/aiResponse";
import { Button, Modal } from "flowbite-react";

type Probs = {
    show:boolean,
    onClose:() => void,
    title:string,
    aiType:string,
    aiReason:string
}

const AiRecommandationModal = (probs:Probs) => {
    return (<>
           {/* modal */}
        <Modal
            show={probs.show}
            onClose={() => probs.onClose()}
            dismissible
            size="lg"
            className="!bg-transparent"
        >
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl ">
                
                {/* ====== نوار رنگی بالای مودال ====== */}
                <div className="h-1.5 bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500" />
                
                {/* ====== دکمه بستن ====== */}
                <button
                    onClick={() => probs.onClose()}
                    className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-10"
                    aria-label="بستن"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* ====== بدنه ====== */}
                <div className="px-8 pt-8 pb-6">
                    
                    {/* آیکون + عنوان */}
                    <div className="text-center mb-6">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full 
                                        bg-gradient-to-br from-purple-100 to-indigo-100 
                                        dark:from-purple-900/40 dark:to-indigo-900/40
                                        ring-4 ring-purple-50 dark:ring-purple-900/20
                                        animate-pulse-slow">
                            <span className="text-4xl">💡</span>
                        </div>

                        {/* اسم آیتم */}
                        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-2">
                            item analysis
                        </p>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                            «{probs.title}»
                        </h3>

                        {/* نوع پیشنهادی */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 
                                        bg-gradient-to-r from-purple-500 to-indigo-500
                                        text-white text-sm font-bold rounded-full
                                        shadow-lg shadow-purple-500/30">
                            <span>✨</span>
                            <span>{probs.aiType}</span>
                        </div>
                    </div>

                    {/* جداکننده */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-200 dark:to-gray-700" />
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                          reason
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-200 dark:to-gray-700" />
                    </div>

                    {/* محتوای Markdown */}
                    <div className="
                        bg-gradient-to-br from-gray-50 to-purple-50/30 
                        dark:from-gray-900/50 dark:to-purple-900/10
                        rounded-xl p-5 
                        border border-gray-100 dark:border-gray-700
                        max-h-96 overflow-y-auto
                        prose prose-sm md:prose-base dark:prose-invert max-w-none
                        prose-headings:text-purple-700 dark:prose-headings:text-purple-300
                        prose-strong:text-gray-900 dark:prose-strong:text-white
                        prose-a:text-purple-600 dark:prose-a:text-purple-400
                    ">
                        <AiResponse text={probs.aiReason} />
                    </div>

                    {/* دکمه بستن پایین */}
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={() => probs.onClose()}
                            className="
                                px-8 py-2.5 
                                bg-gradient-to-r from-purple-500 to-indigo-500
                                hover:from-purple-600 hover:to-indigo-600
                                text-white font-bold text-sm
                                rounded-xl
                                shadow-lg shadow-purple-500/30
                                hover:shadow-xl hover:shadow-purple-500/40
                                transition-all duration-300
                                transform hover:-translate-y-0.5
                                active:translate-y-0
                            "
                        >
                            Got it ✓
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    </>)
}


export default AiRecommandationModal;