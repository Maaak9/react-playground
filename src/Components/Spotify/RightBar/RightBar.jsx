import React from "react";
import { Icon } from '@material-ui/core';
import { SortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc';
import styled from 'styled-components'

import ListTracks from "../ListTracks";
import QuestionItem from './QuestionItem';

const SortabelItemWrapper = styled.div`
  margin: 5px;
  margin-bottom: 10px;

  .material-icons {
    margin-right: 10px;
  }
`;

export default function(props) {
  const {
    searchResult,
    playTrack,
  } = props;

  const DragHandle = sortableHandle(() => <Icon className="fas fa-grip-lines" />);

  const SortableItem = SortableElement(({item}) => {
    return (
      <SortabelItemWrapper>
        <QuestionItem
          DragHandle={DragHandle}
          item={item}
        />
      </SortabelItemWrapper>
    )
  });

  const SortableList = SortableContainer(({items}) => {
    return (
      <div>
        {items.map((item, index) => (
            <SortableItem key={`item-${index}`} index={index} item={item} />
        ))}
      </div>
    );
  });

  const deItems = [
    {
      summary: 'General settings I am an expansion panel',
      content: 'Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam egetmaximus est, id dignissim quam.',
      panelIndex: 1,
    },
    {
      summary: 'You are currently not an owner',
      content: `Optimizing dime bags of pre-rolled honey oil dabs. California kush roll it up into a fat blunt for medicinal purposes to elevate your consciousness. Rolling down the street smoking endo, laid back. Oh my gawd, they like totally know I'm high. Rasta!`,
      panelIndex: 2,
    },
    {
      summary: 'This is pretty coool',
      content: `An ancient plant referenced biblically as the Holy Herb and gets your noggin’ rocked. OG grandaddy purps with notes of diesel. Extremely dope chronic eye drops in the basement with psychedelli`,
      panelIndex: 3,
    },
    {
      summary: 'lelelel wwowo',
      content: `Optimizing dime bags of pre-rolled honey oil dabs. California kush roll it up into a fat blunt for medicinal purposes to elevate your consciousness. Rolling down the street smoking endo, laid back. Oh my gawd, they like totally know I'm high. Rasta!

      An ancient plant referenced biblically as the Holy Herb and gets your noggin’ rocked. OG grandaddy purps with notes of diesel. Extremely dope chronic eye drops in the basement with psychedellic nugs. Hot box at 4:20 the fatty dank endo doobie in a cashed roachclip, Bogart. Fully man, keif gummies are the indoor equivalent of body high super mellow.
      `,
      panelIndex: 4,
    },
  ]

  const onSortEnd = ({oldIndex, newIndex}) => {
    console.warn('oldIndex', oldIndex);
    console.warn('newIndex', newIndex);
  };

  return (
    <React.Fragment>
      <SortableList
        onSortEnd={onSortEnd}
        useDragHandle={true}
        items={deItems}
      />
      <div>
        { searchResult ? (
          <ListTracks
            title={"Search result"}
            items={searchResult.tracks.items}
            playTrack={playTrack}
          />
        ) : null
        }
      </div>
    </React.Fragment>
  )

}
