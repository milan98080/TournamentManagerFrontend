function LoadingSpinner({ className }: { className?: string }) {
  const boxes = new Array(12).fill(0);
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className={className ?? 'h-5 w-5'}
        preserveAspectRatio="xMidYMid"
      >
        {boxes.map((box, index) => {
          return (
            <g
              key={'loader-piece-' + index}
              transform={`rotate(${(360 * index) / boxes.length} 50 50)`}
            >
              <rect
                x="45"
                y="5"
                rx="2"
                ry="2"
                width="8"
                height="25"
                fill="currentColor"
              >
                <animate
                  attributeName="opacity"
                  values="1;0"
                  keyTimes="0;1"
                  dur="1s"
                  begin={`${(index + 1 - boxes.length) / boxes.length}s`}
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          );
        })}
      </svg>
    </>
  );
}

export function AbsoluteSpinner() {
  return <LoadingSpinner className="h-4 w-4 text-primary-base" />;
}
