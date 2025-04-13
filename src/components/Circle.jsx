import React from "react";

const Circle = ({ aqiValue = 100, maxAqi = 100, isDarkMode }) => {
  const validAqiValue = isNaN(aqiValue) ? 0 : aqiValue;
  const validMaxAqi = isNaN(maxAqi) || maxAqi === 0 ? 100 : maxAqi;

  const getStrokeColorAndText = (score) => {
    if (score <= 50) return { color: "#ff0000", text: "Overall Score" };
    else if (score <= 60) return { color: "#ffcc00", text: "Overall Score" };
    else return { color: "#00b050", text: "Overall Score" };
  };

  const { color, text } = getStrokeColorAndText(validAqiValue);

  const radius = 80;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = Math.min(validAqiValue / validMaxAqi, 1);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      >
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="none"
          stroke={isDarkMode ? "rgba(255,255,255,0.2)" : "#e6e6e6"}
          strokeWidth={strokeWidth}
        />

        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius} ${radius})`}
        />

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fill={color}
          dominantBaseline="middle"
          fontSize="50"
          fontWeight="bold"
        >
          {validAqiValue}
        </text>

        <text
          x="50%"
          y={radius + 40}
          textAnchor="middle"
          fill={color}
          fontSize="16"
        >
          {text}
        </text>
      </svg>
    </div>
  );
};

export default Circle;
