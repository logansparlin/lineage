import { Image } from "../global/image"
import { SitePortableText } from "../global/site-portable-text"

const shadows = {
  0: 'shadow-orange lg:hover:shadow-orange-hover',
  1: 'shadow-green lg:hover:shadow-green-hover',
  2: 'shadow-blue lg:hover:shadow-blue-hover',
  3: 'shadow-pink lg:hover:shadow-pink-hover',
}

export const TeamPage = ({
  title,
  members,
}) => {
  return (
    <div className="flex flex-col gap-y-100">
      <h1 className="text-46 lg:text-83">{title}</h1>

      <div className="grid lg:grid-cols-2 lg:gap-x-150 gap-y-60 lg:gap-y-120">
        {members?.map((member: any, index: number) => {
          const shadow = shadows[index % Object.keys(shadows).length]
          return (
            <div key={member._id} className="flex flex-col gap-y-20">
              <div
                className={`relative w-full aspect-square overflow-hidden rounded-20 transition-shadow duration-500 ease ${shadow}`}
              >
                <Image image={member.image} sizes="(max-width: 768px) 90vw, 40vw" />
              </div>
              <div className="flex flex-col gap-y-30">
                <div className="flex flex-col items-start">
                  <h2 className="text-32 lg:text-36">{member.name}</h2>
                  <p className="text-16 font-mono">{member.role}</p>
                </div>
                <div className="w-full text-18 lg:text-20">
                  <SitePortableText value={member.bio} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}