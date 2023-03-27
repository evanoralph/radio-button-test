import React, {useState} from 'react';
import {Container, Grid, Label, Icon, Segment, Sidebar, Radio} from 'semantic-ui-react';
import {Menu} from './menus'
import styled from "styled-components";

const MenuItem = ({value, isChecked, handleOnchange, index, id, selected}) => {

  const _handleOnchange = () => {
    if(!isDisabled()) {
      handleOnchange({isChecked, index, id});
    }
  }


  const isDisabled = () => {
    //show the rules validation for the food selection
    let IdRestricted = [];
    const ids = selected?.map(s => s.id);

    selected.forEach((selectedData) => {
      const rule = Menu.rules[selectedData.id];
      if (rule) {
        IdRestricted = [...IdRestricted, ...rule];
      }
    });

    // this will disable the fields on the group that required to have selection before will be enable
    if(index > 0 && !selected[index - 1].id){
      return true;
    }

    return IdRestricted.includes(Number(id));
  }

  return (
    <ItemWrapper>
      <Label>
        <Radio toggle label={value} checked={selected[index].id == id} disabled={isDisabled()} onClick={_handleOnchange}/>
      </Label>
    </ItemWrapper>
  );
};

export default MenuItem;


const ItemWrapper = styled(Grid.Column)`
  margin-bottom: 10px !important;
`


