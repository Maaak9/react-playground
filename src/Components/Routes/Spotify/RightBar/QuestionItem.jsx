import React from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SongForm from "../../../Dialog/SongForm";


export default function(props) {
  const {
    question,
    DragHandle,
    removeQuizQuestion,
  } = props;

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, toggle) => {
    setExpanded(toggle);
  };

  return (
    <ExpansionPanel expanded={expanded} onChange={handleChange()}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
      <DragHandle />
      <Typography>{question.question}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <SongForm
          track={question.track}
          question={question.question}
          answer1={question.answer1}
          answer2={question.answer2}
          answer3={question.answer3}
          answer4={question.answer4}
          removeQuizQuestion={removeQuizQuestion}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
