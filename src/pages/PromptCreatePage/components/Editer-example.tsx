import { $getRoot, $getSelection } from 'lexical';
import { useEffect } from 'react';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

const theme = {
  // Theme styling goes here
  //...
};
const placeholder = 'Enter some ...';

function onError(error: any) {
  console.error(error);
}

export function Editor() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  };

  return (
    <div className="mx-auto my-5 rounded max-w-[600px] text-black relative leading-[20px] font-normal text-left rounded-tl-[10px] rounded-tr-[10px]">
      <div className="bg-white relative">
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="min-h-[150px] resize-none text-[15px] caret-[#444] relative [tab-size:1] outline-none px-[10px] py-[15px]"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="text-[#999] overflow-hidden absolute [text-overflow:ellipsis] top-[15px] left-[10px] text-[15px] select-none inline-block pointer-events-none">
                    {placeholder}
                  </div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </LexicalComposer>
      </div>
    </div>
  );
}
