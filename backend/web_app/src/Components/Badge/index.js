import { MainContainer } from './styles';

const Badge = ({
  title,
  color = '#6941C6',
  bgColor = '#F9F5FF',
  icon = null,
  suffix = null,
  customStyle = {},
  ...props
}) => {
  return (
    <MainContainer
      color={color}
      bgColor={bgColor}
      style={customStyle}
      {...props}
    >
      {icon}
      {title && <span>{title}</span>}
      {suffix && suffix}
    </MainContainer>
  );
};

export default Badge;
