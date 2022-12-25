/* eslint-disable react/no-danger */
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

export const Markdown = ({ source = '' }: { source?: string }) => (
  <div
    className="break-words"
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(marked.parse(source))
    }}
  />
);
