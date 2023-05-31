import { SvgXml } from "react-native-svg";

export function SvgComponent({width="50px",color="#000"}) {
  const svgMarkup = `<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="${color}">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  `;
  const SvgImage = () => <SvgXml xml={svgMarkup} width={width} />;
  return <SvgImage />;
}
