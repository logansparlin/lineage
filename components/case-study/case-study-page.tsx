import { Modules } from "../modules"
import { StepText } from "../steps/step-text"

export const CaseStudyPage = (props) => {
  const { content, title, step, description } = props;

  return (
    <div className="w-fit h-screen flex gap-x-150">
      <div className="w-screen max-w-960 h-screen flex flex-col items-start justify-center gap-130">
        <div className="flex flex-col gap-y-20">
          <h1 className="text-case-title">{title}</h1>
          <StepText step={step} />
        </div>

        <p className="text-23 max-w-600 font-medium">{description}</p>
      </div>
      <Modules modules={content} />
    </div>
  )
}