import * as React from "react";

import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const TwitterIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
        fill="currentColor"
      />
    </svg>
  );
};

export const GithubIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const DownloadIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="1em"
  height="1em"
  viewBox="0 0 15 15"
  {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.5 1.05a.45.45 0 0 1 .45.45v6.914l2.232-2.232a.45.45 0 1 1 .636.636l-3 3a.45.45 0 0 1-.636 0l-3-3a.45.45 0 1 1 .636-.636L7.05 8.414V1.5a.45.45 0 0 1 .45-.45ZM2.5 10a.5.5 0 0 1 .5.5V12c0 .554.446 1 .996 1h7.005A.999.999 0 0 0 12 12v-1.5a.5.5 0 0 1 1 0V12a2 2 0 0 1-1.999 2H3.996A1.997 1.997 0 0 1 2 12v-1.5a.5.5 0 0 1 .5-.5Z"
      clipRule="evenodd"
    ></path>
</svg>
);

export const TemplateIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="1em"
  height="1em"
  viewBox="0 0 15 15"
  {...props}
>
  <path
    fill="currentColor"
    fillRule="evenodd"
    d="M12.5 2H8v5h5V2.5a.5.5 0 0 0-.5-.5Zm.5 6H8v5h4.5a.5.5 0 0 0 .5-.5V8ZM7 7V2H2.5a.5.5 0 0 0-.5.5V7h5ZM2 8v4.5a.5.5 0 0 0 .5.5H7V8H2Zm.5-7A1.5 1.5 0 0 0 1 2.5v10A1.5 1.5 0 0 0 2.5 14h10a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 12.5 1h-10Z"
    clipRule="evenodd"
  ></path>
</svg>
);

export const SetBorderIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="1em"
  height="1em"
  viewBox="0 0 15 15"
  {...props}
>
  <path fill="currentColor" d="M3 21V3h18v18zM5 5v14h14V5z"/>
</svg>
);

export const DeleteImageIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
<svg xmlns="http://www.w3.org/2000/svg"
  height={size || height}
  width={size || width}
  viewBox="0 0 24 24"
  {...props}
  >
  <path
   fill="currentColor"
   d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/>
  </svg>
);

{/* <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 768 768"><path fill="currentColor" d="M438 167V40c0-23-17-40-39-40h-30c-22 0-39 17-39 40v127c0 22 17 40 39 40h30c22 0 39-18 39-40m-169 24l-90-89c-15-15-41-15-56 0l-21 21c-15 15-15 41 0 56l89 90c15 15 42 15 57 0l21-21c15-15 15-42 0-57m308 78l89-90c15-15 15-41 0-56l-21-21c-15-15-41-15-56 0l-90 89c-15 15-15 42 0 57l21 21c15 15 42 15 57 0M40 438h127c22 0 40-17 40-39v-31c0-22-18-38-40-38H40c-23 0-40 16-40 38v31c0 22 17 39 40 39m561 0h127c23 0 40-17 40-39v-31c0-22-17-38-40-38H601c-22 0-40 16-40 38v31c0 22 18 39 40 39M179 665l90-89c15-15 15-41 0-56l-21-22c-15-15-42-15-57 0l-89 91c-15 15-15 41 0 56l21 20c15 15 41 15 56 0m487-76l-89-91c-15-15-42-15-57 0l-21 22c-15 15-15 41 0 56l90 89c15 15 41 15 56 0l21-20c15-15 15-41 0-56M438 728V601c0-22-17-40-39-40h-30c-22 0-39 18-39 40v127c0 23 17 40 39 40h30c22 0 39-17 39-40"/></svg> */}

export const ClearIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
<svg xmlns="http://www.w3.org/2000/svg" 
  height={size || height}
  width={size || width}
  viewBox="0 0 768 768">
  <path
  fill="currentColor" 
  d="M438 167V40c0-23-17-40-39-40h-30c-22 0-39 17-39 40v127c0 22 17 40 39 40h30c22 0 39-18 39-40m-169 24l-90-89c-15-15-41-15-56 0l-21 21c-15 15-15 41 0 56l89 90c15 15 42 15 57 0l21-21c15-15 15-42 0-57m308 78l89-90c15-15 15-41 0-56l-21-21c-15-15-41-15-56 0l-90 89c-15 15-15 42 0 57l21 21c15 15 42 15 57 0M40 438h127c22 0 40-17 40-39v-31c0-22-18-38-40-38H40c-23 0-40 16-40 38v31c0 22 17 39 40 39m561 0h127c23 0 40-17 40-39v-31c0-22-17-38-40-38H601c-22 0-40 16-40 38v31c0 22 18 39 40 39M179 665l90-89c15-15 15-41 0-56l-21-22c-15-15-42-15-57 0l-89 91c-15 15-15 41 0 56l21 20c15 15 41 15 56 0m487-76l-89-91c-15-15-42-15-57 0l-21 22c-15 15-15 41 0 56l90 89c15 15 41 15 56 0l21-20c15-15 15-41 0-56M438 728V601c0-22-17-40-39-40h-30c-22 0-39 18-39 40v127c0 23 17 40 39 40h30c22 0 39-17 39-40"/>
  </svg>
);



export const SetSizeIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
<svg xmlns="http://www.w3.org/2000/svg" 
  height={size || height}
  width={size || width}
  viewBox="0 0 15 15">
    <path fill="currentColor" d="M11.5 3.05a.45.45 0 0 1 .45.45v4a.45.45 0 0 1-.9 0V4.586L4.586 11.05H7.5a.45.45 0 0 1 0 .9h-4a.45.45 0 0 1-.45-.45v-4a.45.45 0 1 1 .9 0v2.914l6.464-6.464H7.5a.45.45 0 1 1 0-.9z" />
    </svg>
);


export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      // fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

// template icon start
export const TwoLandscapePhotosIcon = ({
  size = 24,
  width,
  height,
  color = "white", 
  ...props
}: IconSvgProps & { iconColor?: string }) => (
  <svg
  width="30"
  height="30"
  viewBox="0 0 30 30"
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
>
  <g clipPath="url(#clip0_5_8)">
    <rect x="0.5" y="15.5" width="29" height="14" stroke={color} />
    <rect x="0.5" y="0.5" width="29" height="15" stroke={color} />
  </g>
  <defs>
    <clipPath id="clip0_5_8">
      <rect width="30" height="30" />
    </clipPath>
  </defs>
</svg>
);

export const ThreeLandscapePhotoIcon = ({
  size = 24,
  width,
  height,
  color = "white", 
  ...props
}: IconSvgProps & { iconColor?: string }) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 30 30"
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_5_2)">
      <rect x="0.5" y="9.5" width="29" height="11" stroke={color} />
      <rect x="0.5" y="0.5" width="29" height="9"  stroke={color}/>
      <rect x="0.5" y="20.5" width="29" height="9" stroke={color} />
    </g>
    <defs>
      <clipPath id="clip0_5_2">
        <rect width="30" height="30" />
      </clipPath>
    </defs>
  </svg>
);

export const ThreePortraitPhotosIcon = ({
  size = 24,
  width,
  height,
  color = "white", 
  ...props
}: IconSvgProps & { iconColor?: string }) => (
  <svg 
  width={width || size}
  height={height || size}
    viewBox="0 0 30 30" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_7_30)">
        <rect x="9.5" y="29.5" width="29" height="11" transform="rotate(-90 9.5 29.5)" stroke={color}/>
        <rect x="0.5" y="29.5" width="29" height="9" transform="rotate(-90 0.5 29.5)" stroke={color}/>
        <rect x="20.5" y="29.5" width="29" height="9" transform="rotate(-90 20.5 29.5)" stroke={color}/>
      </g>
      <defs>
        <clipPath id="clip0_7_30">
          <rect width="30" height="30" />
        </clipPath>
      </defs>
  </svg>
);

export const TwoPortraitPhotosIcon = ({
  size = 24,
  width,
  height,
  color = "white", 
  ...props
}: IconSvgProps & { iconColor?: string }) => (
  <svg 
  width={width || size}
  height={height || size}
    viewBox="0 0 30 30" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_5_12)">
      <rect x="0.5" y="29.5" width="29" height="14" transform="rotate(-90 0.5 29.5)"  stroke={color}/>
      <rect x="14.5" y="29.5" width="29" height="15" transform="rotate(-90 14.5 29.5)"  stroke={color}/>
    </g>
    <defs>
      <clipPath id="clip0_5_12">
        <rect width="30" height="30"/>
      </clipPath>
    </defs>
  </svg>
);

export const FourSquaresIcon = ({
  size = 24,
  width,
  height,
  color = "white", 
  ...props
}: IconSvgProps & { iconColor?: string }) => (
  <svg 
  width={width || size}
  height={height || size}
  fill="none" 
  viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
  <g clipPath="url(#clip0_5_18)">
    <rect x="15.5" y="15.5" width="14" height="14" stroke={color}/>
    <rect x="0.5" y="15.5" width="15" height="14" stroke={color}/>
    <rect x="15.5" y="0.5" width="14" height="15" stroke={color}/>
    <rect x="0.5" y="0.5" width="15" height="15" stroke={color}/>
  </g>
  <defs>
    <clipPath id="clip0_5_18">
      <rect width="30" height="30"/>
    </clipPath>
  </defs>
</svg>
);

export const SixportraitIcon = ({
  size = 24,
  width,
  height,
  color = "white", 
  ...props
}: IconSvgProps & { iconColor?: string }) => (
  <svg width="30"
   height="30"
    viewBox="0 0 30 30"
    fill="none" 
    xmlns="http://www.w3.org/2000/svg">
  <g clipPath="url(#clip0_8_2)">
    <rect x="20.5" y="0.5" width="9" height="15" stroke={color}/>
    <rect x="20.5" y="15.5" width="9" height="14" stroke={color}/>
    <rect x="10.5" y="0.5" width="10" height="15" stroke={color}/>
    <rect x="10.5" y="15.5" width="10" height="14" stroke={color}/>
    <rect x="0.5" y="0.5" width="10" height="15" stroke={color}/>
    <rect x="0.5" y="15.5" width="10" height="14" stroke={color}/>
  </g>
  <defs>
    <clipPath id="clip0_8_2">
      <rect width="30" height="30"/>
    </clipPath>
  </defs>
</svg>
);

export const FourSquaresUnevenIcon = ({
  size = 24,
  width,
  height,
  color = "white", 
  ...props
}: IconSvgProps & { iconColor?: string }) => (
<svg width="30"
 height="30" 
 viewBox="0 0 30 30"
  fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clipPath="url(#clip0_5_24)">
    <rect x="15.5" y="11.5" width="14" height="18" stroke={color}/>
    <rect x="0.5" y="18.5" width="15" height="11" stroke={color}/>
    <rect x="15.5" y="0.5" width="14" height="11" stroke={color}/>
    <rect x="0.5" y="0.5" width="15" height="18" stroke={color}/>
  </g>
  <defs>
    <clipPath id="clip0_5_24">
      <rect width="30" height="30"/>
    </clipPath>
  </defs>
</svg>
);

export const ThreeSquares2Left1RightIcon = ({
  size = 24,
  width,
  height,
  color = "white", 
  ...props
}: IconSvgProps & { iconColor?: string }) => (
<svg width="30"
 height="30" 
 viewBox="0 0 30 30"
  fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clipPath="url(#clip0_5_29)">
    <rect x="0.5" y="15.5" width="15" height="14" stroke={color}/>
    <rect x="15.5" y="0.5" width="14" height="29" stroke={color}/>
    <rect x="0.5" y="0.5" width="15" height="15" stroke={color}/>
  </g>
  <defs>
    <clipPath id="clip0_5_29">
      <rect width="30" height="30"/>
    </clipPath>
  </defs>
</svg>
);

export const Template3Squares2Right1LeftIcon = ({
  size = 24,
  width,
  height,
  color = "white", 
  ...props
}: IconSvgProps & { iconColor?: string }) => (
<svg width="30"
 height="30" 
 viewBox="0 0 30 30"
  fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clipPath="url(#clip0_5_34)">
    <rect x="14.5" y="15.5" width="15" height="14" stroke={color}/>
    <rect x="0.5" y="0.5" width="14" height="29" stroke={color}/>
    <rect x="14.5" y="0.5" width="15" height="15" stroke={color}/>
  </g>
  <defs>
    <clipPath id="clip0_5_34">
      <rect width="30" height="30"/>
    </clipPath>
  </defs>
</svg>
);

export const Template1Landscape2SquaresBottomIcon = ({
  size = 24,
  width,
  height,
  color = "white", 
  ...props
}: IconSvgProps & { iconColor?: string }) => (
<svg width="30"
 height="30" 
 viewBox="0 0 30 30"
  fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clipPath="url(#clip0_5_18)">
    <rect x="15.5" y="14.5" width="14" height="15" stroke={color}/>
    <rect x="0.5" y="14.5" width="15" height="15" stroke={color}/>
    <rect x="0.5" y="0.5" width="29" height="14" stroke={color}/>
  </g>
  <defs>
    <clipPath id="clip0_5_18">
      <rect width="30" height="30"/>
    </clipPath>
  </defs>
</svg>
);

// template icon end

export const HeartFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);


