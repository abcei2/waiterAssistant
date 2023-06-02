import { Svg, Path } from "react-native-svg";

export const SvgComponent = ({width="50px",color="#000", icon="add"}) => {
  
  const selectIcon = (icon) => {
    const height = width;
    switch (icon) {
      case "add":
        return <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <Path d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
      </Svg>
      case "remove":
        return <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <Path d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
      </Svg>
      case "trash":
        return <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="none"
        stroke={color}
      >
        <Path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </Svg>
      default:
        return <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={60}
        height={60}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <Path d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
      </Svg>
    }
  }
  return selectIcon(icon);
}

