import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import Button from "../components/auth/Button";
import { gql, useMutation } from "@apollo/client";
import { FatLink } from "../components/shared";
import { useHistory } from "react-router-dom";
import routes from "../routes";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_COFFEE_SHOP_MUTATION = gql`
  mutation createCoffeeShop($name: String!, $category: String) {
    createCoffeeShop(name: $name, category: $category) {
      id
    }
  }
`;

function AddShop() {
  const history = useHistory();
  const onCompleted = (data) => {
    const {
      createCoffeeShop: { id },
    } = data;
    if (!id) {
      return;
    }
    history.push(routes.home);
  };
  const [createCoffeeShop, { loading }] = useMutation(
    CREATE_COFFEE_SHOP_MUTATION,
    {
      onCompleted,
    }
  );
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createCoffeeShop({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Create Shop" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faCoffee} size="3x" />
          <Subtitle>Create Shop to enjoy coffee with your friends.</Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "Shop name is required",
            })}
            name="name"
            type="text"
            placeholder="Shop Name"
          />
          <Input
            ref={register}
            name="category"
            type="text"
            placeholder="Category"
          />
          <Button
            type="submit"
            value={loading ? "loading..." : "Create Shop"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
    </AuthLayout>
  );
}

export default AddShop;
