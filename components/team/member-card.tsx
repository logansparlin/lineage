import { Image } from "../global/image"
import { MemberBio } from "./member-bio"

export const MemberCard = (props) => {
  const { name, role, image, bio, shadowClass, slug, style } = props;

  return (
    <div className="flex flex-col gap-y-20" style={style}>
      <div className="relative z-[1] w-full group">
        <div className="relative z-[2] w-full h-full aspect-square overflow-hidden rounded-20">
          <Image image={image} sizes="(max-width: 768px) 90vw, 40vw" className="relative z-[2]" />
        </div>
        <div className={`${shadowClass} absolute origin-center opacity-80 inset-0 w-full h-full z-[1] rounded-[25%] transition-shadow duration-500 ease`} />
      </div>
      <div className="relative z-[2] flex flex-col gap-y-30">
        <div className="flex flex-col items-start">
          <h2 className="text-32 lg:text-36">{name}</h2>
          <p className="text-16 font-mono">{role}</p>
        </div>
        <MemberBio slug={slug} bio={bio} />
      </div>
    </div>
  )
}