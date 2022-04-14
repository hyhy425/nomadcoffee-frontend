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

const EDIT_COFFEE_SHOP_MUTATION = gql`
  mutation editCoffeeShop($id: Int!, $name: String, $category: String!) {
    editCoffeeShop(id: $id, name: $name, category: $category) {
      ok
    }
  }
`;

function EditShop() {
  const history = useHistory();
  const onCompleted = (data) => {
    const {
      editCoffeeShop: { ok },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home);
  };
  const [editCoffeeShop, { loading }] = useMutation(EDIT_COFFEE_SHOP_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    editCoffeeShop({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Edit Shop" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faCoffee} size="3x" />
          <Subtitle>Edit Shop to play with your friends.</Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register}
            name="name"
            type="text"
            placeholder="Shop Name"
          />
          <Input
            ref={register({
              required: "Category is required",
            })}
            name="category"
            type="text"
            placeholder="Category"
          />
          <Button
            type="submit"
            value={loading ? "loading..." : "Edit Shop"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
    </AuthLayout>
  );
}

export default EditShop;
