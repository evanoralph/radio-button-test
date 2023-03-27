import React, {useState} from 'react';
import {Container, Grid, Label, Icon, Segment, Button, Radio} from 'semantic-ui-react';
import {Menu} from './menus'
import MenuItem from './menu-item'
import styled from "styled-components";

const MainLayout = () => {

  const [menu, setMenu] = useState(Menu);
  //decided to use state for the selected item for easy access
  const [selected, setSelected] = useState([{}, {}, {}])

  const handleOnchange = (data) => {
    //handle click event for the radio buttons

    //this handle the remove of the selection on the last items group when changing the disable and enable radio buttons
    let starting = data.index;
    while (starting < selected.length) {
      selected[starting] = {}
      starting++;
    }
    selected[data.index] = {id: Number(data.id)};
    setSelected([...selected]);
  }

  const SubmitButton = () => {
    //checking the selected items
    let isDisable = true;

    selected.forEach((data) => {
      if (data.id) {
        isDisable = false;
      } else {
        isDisable = true
      }
    })

    return <Button disabled={isDisable} color={'facebook'}>Submit</Button>
  }


  return (
    <MainContainer>
      <Segment>
        <Container content='center'>
          <Grid columns={3} divided>
            {menu.menus.map((section, index) => {
              return <RadioSection>
                {section.map((menuData) => {
                  return <MenuItem {...menuData} index={index} handleOnchange={handleOnchange} selected={selected}/>
                })}
              </RadioSection>
            })}
          </Grid>
        </Container>
      </Segment>
      <Segment>
        <Container>
          <SubmitButton/>
        </Container>
      </Segment>
    </MainContainer>
  );
};

export default MainLayout;

const RadioSection = styled.div`
  margin-bottom: 50px;
  width: 33.3%;
  margin-top: 20px;
`

const MainContainer = styled(Container)`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-top: 20px;
`


