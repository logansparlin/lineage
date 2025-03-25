import { Quote } from "./quote";
import { QuoteMedia } from "./quote-media";
import { MediaBlock } from "./media-block";
import { TextBlock } from "./text-block";
import { Diptych } from "./diptych";
import { Triptych } from "./triptych";
import { MediaGrid } from "./media-grid";
import { OffsetMedia } from "./offset-media";
import { MediaCarousel } from "./media-carousel";

export const Modules = ({ modules }: { modules: any[] }) => {
  if (!modules) return null;

  return modules.map((module) => {
    return (
      <div key={module._key}>
        {module._type === 'quote' ? <Quote {...module} /> : null}
        {module._type === 'mediaBlock' ? <MediaBlock {...module} /> : null}
        {module._type === 'textBlock' ? <TextBlock {...module} /> : null}
        {module._type === 'diptych' ? <Diptych {...module} /> : null}
        {module._type === 'triptych' ? <Triptych {...module} /> : null}
        {module._type === 'mediaGrid' ? <MediaGrid {...module} /> : null}
        {module._type === 'quoteMedia' ? <QuoteMedia {...module} /> : null}
        {module._type === 'offsetMedia' ? <OffsetMedia {...module} /> : null}
        {module._type === 'mediaCarousel' ? <MediaCarousel {...module} /> : null}
      </div>
    )
  })
}