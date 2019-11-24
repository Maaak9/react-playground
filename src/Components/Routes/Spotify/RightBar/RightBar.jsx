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
    addQuizQuestion,
    quizQuestions,
    updateQuizQuestionOrder,
    removeQuizQuestion,
  } = props;

  const DragHandle = sortableHandle(() => <Icon className="fas fa-grip-lines" />);

  const SortableItem = SortableElement(({question}) => {
    return (
      <SortabelItemWrapper>
        <QuestionItem
          DragHandle={DragHandle}
          question={question}
          removeQuizQuestion={removeQuizQuestion}
        />
      </SortabelItemWrapper>
    )
  });

  const SortableList = SortableContainer(({items}) => {
    return (
      <div>
        {items.map((question, index) => (
            <SortableItem key={`item-${index}`} index={index} question={question} />
        ))}
      </div>
    );
  });

  const onSortEnd = ({oldIndex, newIndex}) => {
    updateQuizQuestionOrder(oldIndex, newIndex);
  };

  return (
    <React.Fragment>
      <SortableList
        onSortEnd={onSortEnd}
        useDragHandle={true}
        items={quizQuestions}
      />
      <div>
        { searchResult ? (
          <ListTracks
            title={"Search result"}
            items={searchResult.tracks.items}
            playTrack={playTrack}
            addQuizQuestion={addQuizQuestion}
            removeQuizQuestion={removeQuizQuestion}
          />
        ) : null
        }
      </div>
    </React.Fragment>
  )

}
