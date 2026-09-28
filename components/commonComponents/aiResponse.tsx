

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AiResponse = ({ text }:{text?:string}) => {
    return (
        <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {text}
            </ReactMarkdown>
        </div>
    );
}


export default AiResponse;