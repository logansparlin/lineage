export const StepOneIllo = () => {
  return (
    <div className="step-illo col-span-full h-screen px-60 pb-80 flex justify-center">
      <svg className="max-w-full max-h-full" width="1015" height="1016" viewBox="0 0 1015 1016" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Circle 1 */}
        <circle cx="507.406" cy="507.91" r="506.825" stroke="#505050" strokeWidth="1.16111"/>
        <circle style={{ opacity: 0 }} className="circle-path circle-1" cx="507.406" cy="507.91" r="506.825" stroke="url(#paint1_linear_21_303)" strokeWidth="1.16111"/>
        
        {/* Circle 2 */}
        <circle cx="506.596" cy="405.298" r="404.213" stroke="#505050" strokeWidth="1.16111"/>
        <circle style={{ opacity: 0 }} className="circle-path circle-3" cx="506.596" cy="405.298" r="404.213" stroke="url(#paint1_linear_21_303)" strokeWidth="1.16111"/>

        {/* Circle 3 */}
        <circle cx="506.596" cy="284.102" r="283.017" stroke="#505050" strokeWidth="1.16111"/>
        <circle style={{ opacity: 0 }} className="circle-path circle-2" cx="506.596" cy="284.102" r="283.017" stroke="url(#paint1_linear_21_303)" strokeWidth="1.16111"/>

        {/* Circle 4 */}
        <circle className="step-one-pin" cx="506.798" cy="161.291" r="160.206" stroke="#505050" strokeWidth="1.16111" />
        <circle style={{ opacity: 0 }} className="circle-path circle-4" cx="506.798" cy="161.291" r="160.206" fill="url(#paint0_linear_21_303)" fillOpacity="0.2" stroke="url(#paint1_linear_21_303)" strokeWidth="1.16111"/>
        
        <defs>
          <linearGradient id="paint0_linear_21_303" x1="506.798" y1="0.504639" x2="506.798" y2="322.077" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBC504"/>
            <stop offset="1" stopColor="#FE9708"/>
          </linearGradient>
          <linearGradient id="paint1_linear_21_303" x1="506.798" y1="0.504639" x2="506.798" y2="322.077" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2F2F2"/>
            <stop offset="1" stopColor="#FE9708"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}