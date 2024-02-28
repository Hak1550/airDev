import { FormDescription, FormHeaderTitleColumn, Title } from "./styles";

const FormTitle = ({ children, description }) => {
  return (
    <FormHeaderTitleColumn>
      <Title>{children}</Title>
      <FormDescription>{description}</FormDescription>
    </FormHeaderTitleColumn>
  );
};

export default FormTitle;
