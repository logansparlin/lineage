import { getRelativePath } from "@/lib/get-relative-path";

import type { FC, ComponentProps } from "react";
import type { SanityLink } from "@/sanity/types";

import Link from "next/link";

interface InternalLinkProps extends SanityLink, Omit<ComponentProps<'a'>, 'href'> {}

export const InternalLink: FC<InternalLinkProps> = ({ _key, _type, label, to, ...rest }) => {
  const href = getRelativePath({ slug: to.slug, type: to._type })

  return (
    <Link href={href} scroll={false} {...rest}>
      {label}
    </Link>
  )
}