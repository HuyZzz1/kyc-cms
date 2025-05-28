import classNames from "classnames";

const Icon = ({ name, id, className, style, ...props }) => {
  const iconClass = classNames({
    [`${className}`]: className,
    icon: true,
    ni: true,
    [`ni-${name}`]: true,
  });
  return <em className={iconClass} id={id} style={style} {...props}></em>;
};
export default Icon;
