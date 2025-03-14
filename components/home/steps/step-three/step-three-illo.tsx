export const StepThreeIllo = () => {
  return (
    <div className="step-illo col-span-full w-full px-60 relative flex justify-center z-[1]">
      <svg className="max-w-full relative z-[1]" width="1207" height="1060" viewBox="0 0 1207 1060" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left Box */}
        <path className="box-left" d="M0.725694 818.601H275.038V1058.81H0.725694V818.601ZM276.49 1058.14V818.292L497.101 689.963V903.855L276.49 1058.14ZM2.75933 817.149L228.785 689.427H495.136L275.568 817.149H2.75933Z" fill="black" stroke="#505050" strokeWidth="1.45139"/>
        <path style={{ opacity: 0 }} className="box-left-highlight" d="M0.725694 818.601H275.038V1058.81H0.725694V818.601ZM276.49 1058.14V818.292L497.101 689.963V903.855L276.49 1058.14ZM2.75933 817.149L228.785 689.427H495.136L275.568 817.149H2.75933Z" fill="url(#step-three-gradient)" fillOpacity="0.2" stroke="url(#step-three-gradient)" strokeWidth="1.45107" />
        
        <path className="box-center" d="M353.265 130.596H627.517V1058.24H353.265V130.596ZM628.968 1057.57V130.288L849.53 1.98698V903.32L628.968 1057.57ZM355.298 129.145L581.273 1.45112H847.566L628.047 129.145H355.298Z" fill="black" stroke="#505050" strokeWidth="1.45107" />
        <path style={{ opacity: 0 }} className="box-center-highlight" d="M353.265 130.596H627.517V1058.24H353.265V130.596ZM628.968 1057.57V130.288L849.53 1.98698V903.32L628.968 1057.57ZM355.298 129.145L581.273 1.45112H847.566L628.047 129.145H355.298Z" fill="url(#step-three-gradient)" fillOpacity="0.2" stroke="url(#step-three-gradient)" strokeWidth="1.45107" />

        {/* Right Box */}
        <path className="box-right" d="M709.003 571.14H983.316V1058.81H709.003V571.14ZM984.767 1058.14V570.831L1205.38 442.502V903.855L984.767 1058.14ZM711.037 569.688L937.062 441.966H1203.41L983.845 569.688H711.037Z" fill="black" stroke="#505050" strokeWidth="1.45139"/>
        <path style={{ opacity: 0 }} className="box-right-highlight" d="M709.003 571.14H983.316V1058.81H709.003V571.14ZM984.767 1058.14V570.831L1205.38 442.502V903.855L984.767 1058.14ZM711.037 569.688L937.062 441.966H1203.41L983.845 569.688H711.037Z" fill="url(#step-three-gradient)" fillOpacity="0.2" stroke="url(#step-three-gradient)" strokeWidth="1.45107"/>
        
        <defs>
          <linearGradient id="step-three-gradient" x1="601.397" y1="0.725586" x2="601.397" y2="1058.96" gradientUnits="userSpaceOnUse">
            <stop stopColor="#01C2FF"/>
            <stop offset="1" stopColor="#087EEE"/>
          </linearGradient>
        </defs>
      </svg>

      <div className="tracking-circles-container absolute top-0 left-0 w-full h-auto z-[20]">
        <svg className="w-full" width="1207" height="1060" viewBox="0 0 1207 1060" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Large Circle */}
          <circle style={{ opacity: 0 }} className="tracking-circle will-change-transform" opacity="0.2" cx="600.844" cy="356.155" r="155.676" fill="url(#step-three-gradient)"/>
          {/* Small Circle */}
          <circle style={{ opacity: 0 }} className="tracking-circle step-three-pin will-change-transform" opacity="0.3" cx="601.498" cy="355.504"r="106.574" fill="url(#step-three-gradient)"/>
        </svg>
      </div>
    </div>
  )
}