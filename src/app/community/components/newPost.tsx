import Image from 'next/image';
import { useRouter } from 'next/navigation';

import write from '@/assets/images/write.png';

import { Button } from '@/components/ui/button';

export default function NewPost() {
  const router = useRouter();
  const goNewPost = () => {
    router.push('/community/post');
  };

  return (
    <div className="fixed bottom-24 right-16 z-50 transition-transform duration-300 ease-in-out hover:scale-110">
      <Button onClick={goNewPost} className="h-16 w-16 rounded-full bg-orange-400 hover:bg-orange-300">
        <Image src={write} alt="게시글 작성" />
      </Button>
    </div>
  );
}
