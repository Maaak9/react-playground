import React from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default function(props) {
  const {
    item,
    DragHandle,
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
      <Typography>{item.summary}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          {item.content}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
