'use client';

import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Eye, FileText, HelpCircle, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
  className?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = '내용을 입력해 주세요.',
  height = 300,
  className = '',
}: MarkdownEditorProps) {
  const [showGuide, setShowGuide] = useState(false);

  const markdownGuide = `# 마크다운 가이드

## 제목 작성
# 큰 제목 (H1)
## 중간 제목 (H2)
### 작은 제목 (H3)

## 텍스트 서식
**굵은 글씨** 또는 __굵은 글씨__
*기울임 글씨* 또는 _기울임 글씨_
~~취소선~~

## 목록
### 번호 있는 목록
1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목

### 번호 없는 목록
- 항목 1
- 항목 2
  - 하위 항목
  - 하위 항목

## 링크와 이미지
[링크 텍스트](https://example.com)

## 인용
> 이것은 인용문입니다.
> 여러 줄로 작성할 수 있습니다.

## 코드
\`인라인 코드\`

\`\`\`
코드 블록
여러 줄 코드
\`\`\`

## 표 만들기
| 열 1 | 열 2 | 열 3 |
|------|------|------|
| 내용1 | 내용2 | 내용3 |
| 내용4 | 내용5 | 내용6 |

## 구분선
---

**팁:** 미리보기 탭을 활용해서 작성한 내용을 확인해보세요!`;

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            마크다운으로 작성하기 
            <span className="ml-1 text-xs text-gray-500">(미리보기 지원)</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowGuide(!showGuide)}
            className="h-7 gap-1 px-2 text-xs text-gray-500 hover:text-gray-700"
          >
            <HelpCircle className="h-3 w-3" />
            가이드
          </Button>
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-7 gap-1 px-2 text-xs text-gray-500 hover:text-red-600"
            >
              <RotateCcw className="h-3 w-3" />
              초기화
            </Button>
          )}
        </div>
      </div>

      {showGuide && (
        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-blue-600" />
            <h4 className="text-sm font-medium text-blue-900">마크다운 작성 가이드</h4>
          </div>
          <div className="max-h-60 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-xs text-blue-800">
              {markdownGuide}
            </pre>
          </div>
        </div>
      )}

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor" className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            편집
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            미리보기
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="mt-2">
          <div data-color-mode="light">
            <MDEditor
              value={value}
              onChange={(val) => onChange(val || '')}
              height={height}
              preview="edit"
              hideToolbar
              data-color-mode="light"
              textareaProps={{
                placeholder,
                style: {
                  fontSize: 14,
                  lineHeight: 1.6,
                  fontFamily: 'inherit',
                },
              }}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="mt-2">
          <div 
            className="rounded-md border border-gray-200 bg-white p-4 text-sm"
            style={{ minHeight: height }}
          >
            {value ? (
              <div data-color-mode="light">
                <MDEditor.Markdown source={value} />
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                <div className="text-center">
                  <Eye className="mx-auto mb-2 h-8 w-8" />
                  <p>편집 탭에서 내용을 작성하면 여기에 미리보기가 표시됩니다.</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}