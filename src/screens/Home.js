import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";

const FEED_QUERY = gql`
  query seeCoffeeShops {
    seeCoffeeShops(page: 1) {
      id
      name
      latitude
      longitude
      user {
        username
        avatarURL
      }
      categories {
        id
        name
      }
    }
  }
`;

const ShopContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
`;
const ShopHeader = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
`;

const ShopData = styled.div`
  padding: 15px;
`;

const ShopActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
`;

const ShopAction = styled.div`
  margin: 0 10px;
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Add = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
`;

function Home() {
  const history = useHistory();
  const { data } = useQuery(FEED_QUERY);
  // console.log(data);
  return (
    <div>
      <PageTitle title="Home" />
      <Add>
        <Link to="/add">
          <Button>add +</Button>
        </Link>
      </Add>
      {data?.seeCoffeeShops?.map((shop) => (
        <ShopContainer key={shop.id}>
          <ShopHeader>
            <Avatar lg url={shop.user.avatarURL} />
            <Username>{shop.user.username}</Username>
          </ShopHeader>
          <PhotoFile src={""} />
          <ShopData>
            <ShopActions>
              <div>
                <Link to={`/shop/${shop.id}`}>
                  <Button>edit</Button>
                </Link>
                <ShopAction>{shop.name}</ShopAction>
                <ShopAction>
                  {shop.categories?.map((category) => (
                    <span key={category.id}>{category.name}</span>
                  ))}
                </ShopAction>
              </div>
            </ShopActions>
          </ShopData>
        </ShopContainer>
      ))}
      <Button onClick={() => logUserOut(history)}>Log out now!</Button>
    </div>
  );
}

export default Home;
