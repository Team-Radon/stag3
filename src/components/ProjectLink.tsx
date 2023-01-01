
import Link from 'next/link';

interface TwitterLinkProps {
  url: string
  social?: string
  socialType: string
  children: React.ReactNode
}

export const ProjectLink = ({ url, social, socialType, children }: TwitterLinkProps) => {
  const Element = social ? Link : 'div';

  return (
    <Element href={social ? `${url}${social}` : '#'} className={`group flex items-center gap-1 mt-4 text-sm  ${social ? 'text-sky-600 hover:underline' : ''}`} title={social || 'N/A'}>
      <span>
        {socialType}
      </span>
      {social ? children : null}
    </Element>
  );
}
