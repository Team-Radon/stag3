import toast from 'react-hot-toast';
import useCopyToClipboard from './useCopyToClipboard';

export function useCopy () {
  const { copy } = useCopyToClipboard();

  function copyToClipboard (text?: string) {
    if (!text) return;
    copy(text).then((copied) => {
      if (copied) toast.success('Copied');
    });
  }

  return { copyToClipboard };
}
