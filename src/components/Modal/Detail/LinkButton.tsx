import styled from "styled-components";

interface PropsType {
  homepage: string;
  contents: string;
}

const LinkButton = ({ homepage, contents }: PropsType) => {
  return (
    <OfficialPage href={`${homepage}`} target="_blank" rel="noreferrer">
      {contents}
    </OfficialPage>
  );
};

const OfficialPage = styled.a`
  padding: 10px 0;
  align-self: flex-end;
  -webkit-align-self: flex-end;
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
`;

export default LinkButton;
