import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { $getRoot, type EditorState, $createParagraphNode, $createTextNode } from 'lexical';
import { useMemo, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const theme = {};

function onError(error: any) {
  console.error(error);
}

// 외부 value를 Lexical 문서에 주입하는 훅
function useSyncExternalValue(value?: string) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (value == null) return;
    editor.update(() => {
      const root = $getRoot();
      const current = root.getTextContent();
      if (current === value) return; // 불필요한 업데이트 방지
      root.clear();
      const p = $createParagraphNode();
      p.append($createTextNode(value));
      root.append(p);
    });
  }, [editor, value]);
}

// 렌더링 출력은 없고, 동기화만 담당
function SyncValue({ value }: { value?: string }) {
  useSyncExternalValue(value);
  return null;
}

export const Editor = ({
  placeholder,
  onChange,
  value,
  maxHight,
}: {
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  maxHight: string;
}) => {
  const initialConfig = useMemo(
    //  재마운트 방지를 위해 memo
    () => ({
      namespace: 'MyEditor',
      theme,
      onError,
    }),
    [],
  );

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
      <div
        className={`bg-white relative overflow-y-auto ${maxHight} overflow-x-hidden`}
        style={{ fontFamily: 'SpoqaHanSansNeo' }}>
        <LexicalComposer initialConfig={initialConfig}>
          <SyncValue value={value} />
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={`w-full min-h-[40px] ${maxHight} resize-none text-[25px] caret-[#444] relative [tab-size:1] outline-none px-[10px] `}
                aria-placeholder={placeholder}
                placeholder={
                  <div
                    className={`absolute -top-2 left-[10px] h-full w-full flex items-center text-[25px] text-text-on-background select-none pointer-events-none`}
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

//모바일 전용
export const MobileEditor = ({
  placeholder,
  onChange,
  value,
  maxHight,
}: {
  placeholder: string;
  onChange: (value: string) => void;
  value?: string;
  maxHight: string;
}) => {
  const initialConfig = useMemo(
    () => ({
      namespace: 'MyEditor',
      theme,
      onError,
    }),
    [],
  );

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
      <div className={`bg-white relative overflow-y-auto ${maxHight} overflow-x-hidden`}>
        <LexicalComposer initialConfig={initialConfig}>
          <SyncValue value={value} />
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={`w-full h-full resize-none text-[12px] caret-[#444] relative [tab-size:1] outline-none px-[10px] `}
                aria-placeholder={placeholder}
                placeholder={
                  <div
                    className={`absolute top-[3px] left-[10px] h-[15px] w-full flex items-center text-[12px] text-[#999] select-none pointer-events-none`}>
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
