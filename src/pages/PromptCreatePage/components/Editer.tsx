import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { $getRoot, type EditorState } from 'lexical';

const theme = {};

function onError(error: any) {
  console.error(error);
}

export const Editor = ({
  placeholder,
  onChange,
  maxHight,
}: {
  placeholder: string;
  onChange: (value: string) => void;
  maxHight: string;
}) => {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  };

  function handleChange(editorState: EditorState) {
    editorState.read(() => {
      // text 추출
      const root = $getRoot();
      const text = root.getTextContent();
      onChange(text); // 텍스트 저장
    });
  }
  return (
    <div
      className={`w-full mx-auto mt-5 rounded text-black relative leading-[36px] font-normal text-left rounded-tl-[10px] rounded-tr-[10px]`}>
      <div className={`bg-white relative overflow-y-auto ${maxHight} overflow-x-hidden`}>
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={`w-full min-h-[40px] ${maxHight} resize-none text-[25px] caret-[#444] relative [tab-size:1] outline-none px-[10px] `}
                aria-placeholder={placeholder}
                placeholder={
                  <div
                    className={`absolute -top-2 left-[10px] h-full w-full flex items-center text-[25px] text-[#999] select-none pointer-events-none`}>
                    {placeholder}
                  </div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={handleChange} />
        </LexicalComposer>
      </div>
    </div>
  );
};

//모바일 전용
export const MobileEditor = ({
  placeholder,
  onChange,
  maxHight,
}: {
  placeholder: string;
  onChange: (value: string) => void;
  maxHight: string;
}) => {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  };

  function handleChange(editorState: EditorState) {
    editorState.read(() => {
      // text 추출
      const root = $getRoot();
      const text = root.getTextContent();
      onChange(text); // 텍스트 저장
    });
  }

  return (
    <div
      className={`w-full mx-auto rounded text-black relative leading-[17px] font-normal text-left rounded-tl-[10px] rounded-tr-[10px]`}>
      <div
        className={`bg-white relative overflow-y-auto ${maxHight} overflow-x-hidden`}
        style={{ fontFamily: 'SpoqaHanSansNeo' }}>
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={`w-full min-h-[13px] resize-none text-[12px] caret-[#444] relative [tab-size:1] outline-none px-[10px] py-[2px] box-border`}
                aria-placeholder={placeholder}
                placeholder={
                  <div
                    className={`absolute top-[2px] left-[10px] text-[12px] text-text-on-background select-none pointer-events-none`}
                    style={{ fontFamily: 'SpoqaHanSansNeo' }}>
                    {placeholder}
                  </div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={handleChange} />
        </LexicalComposer>
      </div>
    </div>
  );
};
