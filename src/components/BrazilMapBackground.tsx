export function BrazilMapBackground() {
  return (
    <div className="brazil-map-background" aria-hidden="true">
      <svg viewBox="0 0 620 720" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="brazilBase" x1="58" y1="42" x2="505" y2="674" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1d5e7c" />
            <stop offset=".55" stopColor="#173c61" />
            <stop offset="1" stopColor="#33236c" />
          </linearGradient>
          <linearGradient id="brazilSignal" x1="177" y1="170" x2="437" y2="571" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2dd4bf" />
            <stop offset=".52" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="mapGlow" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="9" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <path className="brazil-map-outline" d="M117 69L210 37L293 47L350 88L416 109L467 164L493 218L471 262L513 319L502 368L534 414L500 454L481 528L429 590L390 666L344 629L300 636L270 603L213 581L185 525L137 491L107 426L128 368L79 325L91 270L55 216L82 167L73 111L117 69Z" fill="url(#brazilBase)" />
        <g className="brazil-map-lines">
          <path d="M117 69L145 157L91 270L181 278L215 199L293 47" />
          <path d="M145 157L264 145L350 88L416 109L396 190L471 262" />
          <path d="M181 278L137 491L233 464L280 376L264 145" />
          <path d="M264 145L352 209L396 190L417 303L471 262" />
          <path d="M280 376L233 464L300 636L344 629L337 517L417 440L417 303" />
          <path d="M417 303L513 319L502 368L534 414L481 528L417 440" />
          <path d="M417 440L337 517L390 666L429 590L481 528" />
          <path d="M352 209L280 376L417 303" />
          <path d="M107 426L185 525L233 464" />
        </g>
        <g opacity=".9">
          <path className="brazil-map-state state-cyan" d="M145 157L264 145L280 242L181 278L91 270Z" />
          <path className="brazil-map-state state-blue" d="M264 145L352 209L280 376L280 242Z" />
          <path className="brazil-map-state state-teal" d="M352 209L417 303L337 348L280 376Z" />
          <path className="brazil-map-state state-purple" d="M337 348L417 303L417 440L337 517L280 462Z" />
          <path className="brazil-map-state state-violet" d="M417 440L481 528L429 590L390 666L337 517Z" />
        </g>
        <g className="brazil-map-points" filter="url(#mapGlow)">
          <circle cx="286" cy="304" r="5" /><circle cx="353" cy="382" r="4" /><circle cx="401" cy="461" r="5" /><circle cx="224" cy="435" r="3.5" /><circle cx="175" cy="223" r="3.5" />
        </g>
      </svg>
      <span className="brazil-map-caption">BRAZIL SIGNAL MAP</span>
    </div>
  )
}
