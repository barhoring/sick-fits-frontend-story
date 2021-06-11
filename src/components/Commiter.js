import React from "react"
import styled from "styled-components"

const UserPhoto = styled.div`
  background-image: url(${(props) => props.img});
  width: 3rem;
  height: 3rem;
  color: red;
  border-radius: 100px;
  border: 3px solid white;
  background-size: contain;
  box-shadow: rgba(32, 35, 30, 0.2) 2px 4px 9px;
  margin-left: 10px;
`

const Commiter = ({ userImage }) => {
  return (
    <>
      <UserPhoto img={userImage} />
    </>
  )
}
export default Commiter
