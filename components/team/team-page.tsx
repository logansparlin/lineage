import { MemberCard } from "./member-card"

const shadows = {
  0: 'md:shadow-orange md:group-hover:shadow-orange-hover',
  1: 'md:shadow-blue md:group-hover:shadow-blue-hover',
  2: 'md:shadow-green md:group-hover:shadow-green-hover',
  3: 'md:shadow-pink md:group-hover:shadow-pink-hover',
}

const colors = {
  0: { '--button-color': 'var(--color-orange-200)'},
  1: { '--button-color': 'var(--color-blue-200)'},
  2: { '--button-color': 'var(--color-green-200)'},
  3: { '--button-color': 'var(--color-pink-200)'},
}

export const TeamPage = ({
  title,
  members,
}) => {
  return (
    <div className="flex flex-col gap-y-60 md:gap-y-100">
      <h1 className="text-46 md:text-83">{title}</h1>

      <div className="grid md:grid-cols-2 md:gap-x-150 gap-y-60 md:gap-y-120">
        {members?.map((member: any, index: number) => {
          const shadow = shadows[index % Object.keys(shadows).length]
          const color = colors[index % Object.keys(colors).length]

          return (
            <MemberCard
              key={member._id}
              shadowClass={shadow}
              {...member}
              style={{
                ...color,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}