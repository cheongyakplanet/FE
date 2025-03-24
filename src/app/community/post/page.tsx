import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function post() {
  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">새 글 작성</h1>
      <Input className="mb-4" placeholder="제목을 입력하세요" />
      <Textarea className="mb-4 h-40" placeholder="내용을 입력하세요..." />
      <Button className="w-full">게시글 등록</Button>
    </div>
  );
}
